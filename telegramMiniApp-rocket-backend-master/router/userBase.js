import bitcoinTransaction from 'bitcoin-transaction'
import { cipher, db, RANKING_DATA } from '../utils/globals.js'
import { generateWallet, getBtcBalance } from '../blockchain/btc.js'
import pkg from 'mongodb'
import * as bitcoin from 'bitcoinjs-lib'
import axios from 'axios'

const { ObjectId } = pkg;

/**
 * Checks if this name is unique
 *
 * @param {string} name Name provided during registration attempt
 * @throws {'name_occupied'} If the name is already taken
 */
async function isNameUnique (userName) {
  const result = await db.collection('users').findOne({ user_name: userName })
  return result === null
}

/**
 * Checks username format. The username must be between 4 and 25 characters long and must not contain the “@” character
 *
 * @param {string} name Username
 * @throws {'name_incorrect'} If the username is incorrect
 */
function validateName (name) {
  if (!(name !== undefined )) {
    throw Error('name_incorrect')
  }
}

/**
 * Read user data from the database
 *
 * @param {string} userName user_name
 * @returns {Object} User data
 */
async function readData (userName) {
  return await db.collection('users').findOne({ username: userName })
}

function generateRandomString (length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  let result = ''
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * Creates a 32-character session key consisting of latin letters and numbers. Writes a key to the database and returns it
 *
 * @param {string} login Name or email address
 * @returns {string} Session key
 */
async function startSession (login) {
  const session = generateRandomString(32)
  await db.collection('users').updateOne({ $or: [{ name: login }, { email: login }] }, { $set: { session: session } })
  return session
}

/**
 * Verifies the session key
 *
 * @param {string} userName User ID
 * @param {string} session Session key
 * @throws {'name_incorrect'} If there is no user with this id
 * @throws {'session'} If the session key is invalid
 */
export async function checkSession (userName, session) {
  validateSession(session)

  const result = await db.collection('users').findOne({user_name: userName })
  if (!result) {
    throw Error('name_incorrect')
  } else if (session !== result.session) {
    throw Error('session')
  }
}



/**
 * Ends a user session. Nullifies the current session key
 *
 * @param {string} userName User id
 */
export async function endSession (userName) {
  await db.collection('users').updateOne({ user_name: userName }, { $set: { session: null } })
}

/**
 * User registration
 *
 * @param {Object} req Request object
 * @returns {Object} User info and session key
 */
export async function register (userName,realName) {
  validateName(realName)
  const isUnique = await isNameUnique(userName)
  console.log("unique:", isUnique);
  if(isUnique){
    await db.collection('users').insertOne({
      registrationDateTime: new Date(),
      user_name: userName,
      name: realName,
      guests: [],
      balance: {
        virtual: 10,
        real: 10
      },
      gamesHistory: {
        virtual: [],
        real: []
      },
      ranking:RANKING_DATA[0],
      total_earning:0,
      btc: {
        wallet: generateWallet(),
        deposits: [],
        withdraws: [],
        affilation: [],
        deposited: 0
      },
      expiration: new Date().getTime(),
      task:{
        achieve_task: [],
        done_task : []
      } ,
      friend : "",
      first_state : true
   
    })
  }
    
    
}

/**
 * Write page visitor to database
 */
export function logVisitor (req) {
  db.collection('visitors').insertOne({
    ip: req.ip,
    from: req.headers.referer,
    to: req.path,
    uid: req.headers['user-agent'],
    time: new Date()
  })
} 

export async function taskPerform(req){
  const data = await db.collection('users').findOne({user_name : req.body.userName},{_id: 0, performTask: 1, task: 1});
  console.log(data.task)
  return {task:data.task}
}

/**
 * Get info for profile pages
 */
export async function usersInfo (req) {
  await register(req.body.userName,req.body.realName)
  // const data = await db.collection('users').find().project({ _id: 0, name: 1, user_name: 1, gamesHistory: 1, balance: 1, referral: 1, 'btc.wallet.publicAddress': 1, expiration: 1, ranking: 1 }).toArray()
  const data = await db.collection('users').find().project({ _id: 0, name: 1, user_name: 1, gamesHistory: 1, balance: 1, referral: 1, ranking: 1,first_state: 1 }).toArray()
  return {
    allUsersData: data.map(i => {
      // i.btc.wallet.publicAddress = cipher.decrypt(i.btc.wallet.publicAddress)
      if (req.body.historySize) {
        i.realGames = i.gamesHistory.real.length
        i.realWins = i.gamesHistory.real.filter(j => j.crash === 'x').length
        i.realLosses = i.gamesHistory.real.filter(j => j.stop === 'x').length
        if (i.gamesHistory.real.length > req.body.historySize) {
          i.gamesHistory.real = i.gamesHistory.real.slice(i.gamesHistory.real.length - req.body.historySize)
        }
        i.virtualGames = i.gamesHistory.virtual.length
        i.virtualWins = i.gamesHistory.virtual.filter(j => j.crash === 'x').length
        i.virtualLosses = i.gamesHistory.virtual.filter(j => j.stop === 'x').length
        if (i.gamesHistory.virtual.length > req.body.historySize) {
          i.gamesHistory.virtual = i.gamesHistory.virtual.slice(i.gamesHistory.virtual.length - req.body.historySize)
        }
      }
      return i
    })
  }
}

export async function gameHistory (req) {
  let realHistory = [{}], virtualHistory =[{}];
  let data = await db.collection('users').findOne({user_name: req.body.userName}, { _id: 0,  gamesHistory: 1, })

  realHistory = data.gamesHistory.real;
  virtualHistory = virtualHistory;
  if (realHistory.length > req.body.historySize) {
    realHistory = realHistory.slice(realHistory.length - req.body.historySize)
  } else realHistory = data.gamesHistory.real
  if (realHistory.length > req.body.historySize) {
    virtualHistory = virtualHistory.slice(virtualHistory.length - req.body.historySize)
  } else virtualHistory = data.gamesHistory.virtual
  
  return {gamesHistory:{real : realHistory, virtual : virtualHistory}}
}


export async function checkFirst (req) {
  console.log(req.body.userName)
  db.collection('users').updateOne({ user_name: req.body.userName }, { $set: { 'first_state': "false"} })
}

/**
 * Get deposits and send btc to shared wallet
 */
export async function checkDeposits (req) {
  const deposits =
    (await db.collection('users').find().project({ _id: 0, 'btc.wallet.publicAddress': 1, 'btc.deposited': 1, inviter: 1, name: 1, email: 1, 'btc.wallet.privateKeyWIF': 1 }).toArray())
      .map(i => { return { address: cipher.decrypt(i.btc.wallet.publicAddress), recieved: i.btc.deposited, inviter: i.inviter, name: i.name, email: i.email, wif: cipher.decrypt(i.btc.wallet.privateKeyWIF) } })

  // const data = await getBtcBalance(deposits)
  const data =[]

  data.forEach(i => {
    if (i.total_received > i.recieved * 100) {
      const tx = new bitcoin.TransactionBuilder()
      tx.addInput(i.transaction_hash, i.transaction_index)
      tx.addOutput(require('../../secret/secret').publicAddress, i.final_balance - 1500)
      tx.sign(0, bitcoin.ECPair.fromWIF(i.wif))
      const transactionHex = tx.build().toHex()

      axios
        .post('https://api.blockcypher.com/v1/btc/main/txs/push', {
          tx: transactionHex
        })
        .then((res) => {
          console.log(`statusCode: ${res.statusCode}`)
          // console.log(res)

          writeDepositDataToDB(i)
        })
        .catch((error) => {
          console.error(error)
          db.collection('manual_transactions').insertOne({
            rawTx: transactionHex,
            email: i.email,
            date: new Date(),
            pushed: false
          })

          writeDepositDataToDB(i)
        })
    }
  })
}

function writeDepositDataToDB (i) {
  const amount = parseInt(((i.total_received - i.recieved - 1500) / 100).toFixed(0))
  db.collection('users').updateOne({ user_name: i.userName }, { $inc: { 'btc.deposited': amount, 'balance.real': amount } })
  db.collection('users').updateOne({ user_name: i.userName }, { $push: { 'btc.deposits': { id: generateRandomString(8), amount, date: new Date() } } })
  if (i.inviter) {
    db.collection('users').updateOne({ user_name: i.inviter }, { $inc: { 'balance.real': amount * 0.03 } })
    db.collection('users').updateOne({ user_name: i.inviter  }, { $push: { 'btc.affilation': { date: new Date(), amount: amount * 0.03, name: i.name, email: i.email } } })
  }
}

/**
 * Withdraw bitcoins from account
 */
export async function withdraw (req) {
  // await checkSession(req.cookies.user_id, req.cookies.session)
  await checkNameAndPassword(req.cookies.name, req.body.password)

  const data = await db.collection('users').findOne({ name: req.cookies.name }, { _id: 0, 'balance.real': 1 })

  if (req.body.amount < 1) {
    throw new Error('less than 1')
  }

  if (data.balance.real >= req.body.amount) {
    const from = require('./secret/secret').publicAddress
    const to = req.body.publicAddress
    const privateKeyWIF = require('./secret/secret').privateKeyWIF

    bitcoinTransaction.getBalance(from, { network: 'mainnet' }).then(() => {
      return bitcoinTransaction.sendTransaction({
        from,
        to,
        privateKeyWIF,
        btc: req.body.amount / 1000000,
        network: 'mainnet'
      })
    })

    db.collection('users').updateOne({ user_name: req.body.userName }, { $set: { 'btc.withdraws': { date: new Date(), amount: req.body.amount, address: req.body.publicAddress } } })
    return {
      date: new Date(),
      amount: req.body.amount,
      address: req.body.publicAddress
    }
  }
}

/**
 * Get guests list for profile/affilate page
 */
export async function getIncomesFromReferrals (req) {
  const data = await db.collection('users').findOne({ name: req.params.name })

  return {
    data: data.btc.affilation.map(i => {
      return {
        date: i.date,
        name: i.name,
        amount: i.amount
      }
    })
  }
}

/**
 * Get incomes list for profile/affilate page
 */
export async function getReferrals (req) {
  const data = await db.collection('users').findOne({ name: req.params.name })

  const result = []

  for (const i of data.guests) {
    const guest = await db.collection('users').findOne({ user_name: i })

    result.push({
      name: guest.name,
      email: guest.email,
      date: guest.registrationDateTime
    })
  }

  return {
    data: result
  }
}

/**
 * Get info for profile/deposit page
 */
export async function getDeposits (req) {
  const data = await db.collection('users').findOne({ name: req.params.name })

  return {
    data: data.btc.deposits
  }
}

/**
 * Get info for profile/withdraw page
 */
export async function getWithdraws (req) {
  const data = await db.collection('users').findOne({ name: req.params.name })

  return {
    data: data.btc.withdraws,
    balance: data.balance.real
  }
}

export async function taskBalance (req){
  const data = req.body;
   await db.collection('users').updateOne({user_name : data.userName},{$inc : {'balance.real' : parseFloat(data.amount)}, $push : {'task.done_task':data.task}});
}
export async function addFriend (req, res){
  await register(req.body.userName, req.body.realName);
  
  try {
    const friend_check = await db.collection('users').findOne({ 'user_name': req.body.userName });
   
    if (friend_check.friend !=="") {
      
      return res
        .status(400)
        .json({ msg: "You are already added in friend item" });
    } else {
      
      await db.collection('users').updateOne(
        { user_name: req.body.userName },
        { $set:{'friend' :req.body.friend }})
        
      await db.collection('users').updateOne(
          { user_name: req.body.friend},
          { $inc: { 'balance.real': 100,'total_earning':100} })
      // res.json(friend_new);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
export async function getFriend (req, res){
  try {
   

    const data = await db.collection('users').find({friend:req.body.userName}).project({ _id: 0, name: 1,   balance: 1,  ranking: 1 }).toArray()

    return {friendData: data}
  } catch (error) {
    res.status(400).json({ msg: error });
  } 
};

export async function getTask (req){
  try{
    const data = await db.collection('tasks').find({}).project({_id:0, src:1, title:1,amount:1}).toArray()
    return {task:data}
  }catch(error){
    console.log(error)
  }
}
