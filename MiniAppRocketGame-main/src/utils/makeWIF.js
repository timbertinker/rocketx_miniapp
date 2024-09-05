import { cipher } from './globals'
import sha256 from 'js-sha256'
import base58 from 'bs58'

// Generating private key WIF
const s1 = Buffer.from('80' + process.argv[2].toString('hex'), 'hex')
const s2 = sha256(s1)
const s3 = sha256(Buffer.from(s2, 'hex'))
const checksum_ = s3.substring(0, 8)
const s4 = s1.toString('hex') + checksum_
const privateKeyWIF = base58.encode(Buffer.from(s4, 'hex'))

console.log('Private Key WIF:')
console.log(privateKeyWIF)

console.log('Encrypted:')
console.log(cipher.encrypt(privateKeyWIF))
