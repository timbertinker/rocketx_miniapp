import axios from 'axios'
import { getBtcBalance } from '../backend/btc'
import * as bitcoin from 'bitcoinjs-lib'
require('@babel/polyfill')

async function main () {
  const prompt = require('prompt-sync')({ sigint: true })

  const from = prompt('Sender public address: ')
  const to = prompt('Reciever public address: ')
  const privateKeyWIF = prompt('Sender private key WIF: ')

  const senderData = (await getBtcBalance([{ address: from }]))[0]

  const tx = new bitcoin.TransactionBuilder()
  tx.addInput(senderData.transaction_hash, senderData.transaction_index)
  tx.addOutput(to, senderData.final_balance - 1500)
  tx.sign(0, bitcoin.ECPair.fromWIF(privateKeyWIF))
  const transactionHex = tx.build().toHex()

  axios
    .post('https://api.blockcypher.com/v1/btc/main/txs/push', {
      tx: transactionHex
    })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
}

main()
