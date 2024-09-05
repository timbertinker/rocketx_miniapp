import http from 'http'
import app from './main/index.js'
import { checkSession, checkDeposits } from './router/userBase.js'
import  secretpkg  from './secret/index.js'
import { db, setDb } from './utils/globals.js'
import pkg from 'mongodb'
import { server as WebSocketServer } from 'websocket'
import { startGame, stopGame } from './game/index.js'
import cors from "cors"

app.use(cors())
const { MongoClient, ObjectId } = pkg
const {connectionString, connectionString1} = secretpkg;
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

const wsServer = new WebSocketServer({
  httpServer: server
})

async function checkBalance (userName, bet, isReal) {
  let balance = (await db.collection('users').findOne({ user_name: userName }, { _id: 0, balance: 1 })).balance

  balance = isReal ? balance.real : balance.virtual
  
  console.log("balance: ",balance," bet: ",bet)

  if (balance < bet) {
    throw new Error('insufficient_funds')
  }
}

wsServer.on('request', request => {
  const connection = request.accept(null, request.origin)
  let isGameRunning = false 
  let bet
  let startTime
  let isReal
  let userName
  const setStopFlag = () => { isGameRunning = false }

  connection.on('message', message => {
    const data = JSON.parse(message.utf8Data)

    try {
      
      if (data.userName) {
        checkBalance(data.userName, data.bet, data.isReal)
      }
      if (data.bet < 1) {
        throw new Error('Small bet')
      }

      if (data.operation === 'start' && !isGameRunning) {
        isGameRunning = true
        bet = data.bet
        isReal = data.isReal
        userName = data.userName
        startTime = startGame(connection, data, setStopFlag)
      } else if (data.operation === 'stop' && isGameRunning) {
        isGameRunning = false
        stopGame(connection, startTime, bet, isReal,userName)
      } else if (data.operation === 'debug') {
        // eslint-disable-next-line no-eval
        connection.sendUTF(eval(data.debugParam))
      } else if (data.operation === 'get_free_bets') {
        const expiration = new Date().getTime() + 60 * 60 * 1000
        connection.sendUTF(JSON.stringify({ operation: 'free_bets', expiration }))
        db.collection('users').updateOne({ user_name: userName }, { $set: { expiration }, $inc: { 'balance.virtual': 3 } })
      }
    } catch (e) {
      // console.log(e)
    }
  })
  connection.on('close', (reasonCode, description) => {
    console.log('Client has disconnected.')
  })
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

async function onListening () {

  const client = new MongoClient(connectionString);
  try{
    await client.connect();
    setDb(client.db('rocketx'))
    checkDeposits()
    setInterval(checkDeposits, 60 * 60 * 1000)
  } catch(error){
    console.error("Database connection error:", error);
  }
  
  
}
