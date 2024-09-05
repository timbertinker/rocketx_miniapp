import { cipher } from './globals'
import { generateWallet } from '../backend/btc'

const wallet = generateWallet()

const decryptedWallet = {}
for (const [key, value] of Object.entries(wallet)) {
  decryptedWallet[key] = cipher.decrypt(value)
}

console.log('Wallet:')
console.log(decryptedWallet)

console.log('Encrypted:')
console.log(wallet)
