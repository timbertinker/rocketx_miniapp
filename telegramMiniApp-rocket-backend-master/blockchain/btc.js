/* eslint-disable new-cap */
import base58 from 'bs58'
import { cipher } from '../utils/globals.js'
import pkg from 'elliptic'
import fetch from 'node-fetch'
import ripemd160 from 'ripemd160'
import secureRandom from 'secure-random'
import sha256 from 'js-sha256'

const {ec:EC} = pkg; 
// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('secp256k1')

export function generateWallet () {
  const max = Buffer.from('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', 'hex')
  let isInvalid = true
  let privateKey
  while (isInvalid) {
    privateKey = secureRandom.randomBuffer(32)
    if (Buffer.compare(max, privateKey) === 1) {
      isInvalid = false
    }
  }

  const keys = ec.keyFromPrivate(privateKey)
  const publicKey = keys.getPublic('hex')

  const hash = sha256(Buffer.from(publicKey, 'hex'))
  const publicKeyHash = new ripemd160().update(Buffer.from(hash, 'hex')).digest()

  // Generating public address
  // step 1 - add prefix "00" in hex
  const step1 = Buffer.from('00' + publicKeyHash.toString('hex'), 'hex')
  // step 2 - create SHA256 hash of step 1
  const step2 = sha256(step1)
  // step 3 - create SHA256 hash of step 2
  const step3 = sha256(Buffer.from(step2, 'hex'))
  // step 4 - find the 1st byte of step 3 - save as "checksum"
  const checksum = step3.substring(0, 8)
  // step 5 - add step 1 + checksum
  const step4 = step1.toString('hex') + checksum
  // return base 58 encoding of step 5
  const publicAddress = base58.encode(Buffer.from(step4, 'hex'))

  console.log(publicAddress)

  // Generating private key WIF
  const s1 = Buffer.from('80' + privateKey.toString('hex'), 'hex')
  const s2 = sha256(s1)
  const s3 = sha256(Buffer.from(s2, 'hex'))
  const checksum_ = s3.substring(0, 8)
  const s4 = s1.toString('hex') + checksum_
  const privateKeyWIF = base58.encode(Buffer.from(s4, 'hex'))

  return {
    privateKey: cipher.encrypt(privateKey.toString('hex')),
    publicKey: cipher.encrypt(publicKey),
    publicAddress: cipher.encrypt(publicAddress),
    privateKeyWIF: cipher.encrypt(privateKeyWIF)
  }
}

function getHashAndOutIndex (transactions, address) {
  for (let tIndex = 0; tIndex < transactions.length; tIndex++) {
    for (let oIndex = 0; oIndex < transactions[tIndex].out.length; oIndex++) {
      if (transactions[tIndex].out[oIndex].addr === address) {
        return { hash: transactions[tIndex].hash, index: oIndex }
      }
    }
  }

  return { hash: '', index: 0 }
}

export async function getBtcBalance (addresses) {
  let url = 'https://blockchain.info/multiaddr?active='
  addresses.forEach(i => { url += `${i.address}|` })
  url = url.slice(0, -1)

  const response = await fetch(url)
  const json = await response.json()
  const transactions = json.txs
  const results = json.addresses.map(i => {
    const { hash, index } = getHashAndOutIndex(transactions, i.address)
    return {
      address: i.address,
      total_received: i.total_received,
      final_balance: i.final_balance,
      transaction_hash: hash,
      transaction_index: index
    }
  })

  return addresses.map(i => {
    for (let j = 0; j < results.length; j++) {
      if (results[j].address === i.address) {
        i.total_received = results[j].total_received
        i.final_balance = results[j].final_balance
        i.transaction_hash = results[j].transaction_hash
        i.transaction_index = results[j].transaction_index
        return i
      }
    }
  })
}
