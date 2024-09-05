import {cipher} from '../utils/globals.js'

const password = encodeURIComponent("tTDbRqhzgVGUxLOA");

// const connectionString = 'TSwRcaWUR6z01B4nQrMmVkt2HU19lKJzxk4s/5VNxBTsae1OHithmQeGv0zZwbMNelnLrcNGMBvkW529+2lnF3Qz9OZxG7gg/w+2RSgjpJycsguwSMjUbnmq7w/G+/V8F1r4rlzcL4nUtJ6ylfe+'
const connectionString = `mongodb+srv://juliosantos950527:${password}@cluster0.kqiaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const connectionString1 = `mongodb://localhost:27017/rocketX`
const staticSalt = '6RqRHnxZtoyQfJJ65vSXgLlP1Y3VypbF'

// const privateKey = 'rQqKWG24YJsZpUOWTWEiQ/WmQOZAssKeTDDnwkH4CKSUsiLvHLnjtQhDC2o6BSv7h+TSRA6q0yxzHavZDJCOGe3mDhJTzL4DUpz0xbKIgNg='
// const publicKey = 'UlVoubylI+QIhSvq9WdbsOAfSL46ZCNKhp3Q0Evd9a0tYUwF0AvsumNl7jkS+e/c2dbcIkgTlL8EJDAVUKv3aEcbiKkKUJAnr7M/AZOe5yYPBHlpCr6iVSr9lR0C16KCP+a7Eo+n+XFV3EuvrwuVXjdTJMSjXZiyqyA9JL0HdCM6fBVsJ22Q1L0w+yF7abtqgr0='
const publicAddress = 'mAp3NxM7B53aLvY+nTKkRaf3O/7NMRpqAqnIykwAf2K59Oj5ec4T1TOdLMT+iDk2O5U='
const privateKeyWIF = '/auMjro3yS1HNOw+slPstH6uWTBHJhc='

export default  {
  connectionString: connectionString,
  connectionString1:connectionString1,
  staticSalt: cipher.decrypt(staticSalt),

  // privateKey: cipher.decrypt(privateKey),
  // publicKey: cipher.decrypt(publicKey),
  publicAddress: cipher.decrypt(publicAddress),
  privateKeyWIF: cipher.decrypt(privateKeyWIF)
}
