import express from 'express'
import * as userBase from './userBase.js'

// import '@babel/polyfill' // async/await compilation bug

/**
 * All site routes
 */
const router = express.Router()

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

/**
 * Generate api routes
 */
function routeFunc (controller) {
  return async (req, res) => {
    try {
      const result = await controller(req)
      res.status(200).send(result === undefined ? {} : result) // res.json() bug fix
    } catch (e) {
      console.log(e.message)
      res.status(500).send({ error: e.message })
    }
  }
}

const postRequests = [
  ['login', userBase.login],
  ['logout', userBase.logout],
  ['recovery', userBase.recovery],
  ['change_password', userBase.changePassword],
  ['change_email', userBase.changeEmail],
  ['support', userBase.support],
  ['users_info', userBase.usersInfo],
  ['resend_letter', userBase.resendConfirmationLetter],
  ['game_history', userBase.gameHistory],
  ['task_perform', userBase.taskPerform],
  ['task_balance',userBase.taskBalance],
  ['add_friend', userBase.addFriend],
  ['get_friend', userBase.getFriend],
  ['check_first',userBase.checkFirst],
  ['get_task',userBase.getTask]

]

postRequests.forEach(([path, controller]) => {
  router.post(`/${path}`, routeFunc(controller))
})

/**
 * Generate page routes
 *
 * @param {string} address Relative path
 * @param {Function} method A function that returns the initial data for rendering the start page
 * @param {string} title Page title
 * @param {string} description Page description
 * @param {string} keywords Page keywords
 */
function addRoute (address, method, title, description, keywords) {
  router.get(`/${address}`, async (req, res) => {
    

    res.render(
      'template', {
        app,
        title,
        keywords,
        description
      }
    )
    userBase.logVisitor(req)
  })
}

router.get('/incomes_from_referrals/:name', async (req, res) => {
  const result = await userBase.getIncomesFromReferrals(req)
  res.status(200).send(result === undefined ? {} : result)
})

router.get('/guests/:name', async (req, res) => {
  const result = await userBase.getReferrals(req)
  res.status(200).send(result === undefined ? {} : result)
})

router.get('/deposits/:name', async (req, res) => {
  const result = await userBase.getDeposits(req)
  res.status(200).send(result === undefined ? {} : result)
})

router.get('/withdraws/:name', async (req, res) => {
  const result = await userBase.getWithdraws(req)
  res.status(200).send(result === undefined ? {} : result)
})

router.get('/confirmation', async (req, res) => {
  userBase.confirmAccount(req, res)
})

export default router
