import { ACCELERATION, db, MAX_WIN, RANKING_DATA, TASK_LIST, TASK_TYPE } from '../utils/globals.js'
import pkg from 'mongodb'


let timeout
const { ObjectId } = pkg
const currentDate = new Date();
const formatedDate = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

let continueCounter  = 0;

async function writeTask(userName,performTask) {
  const data = await db.collection('users').findOne({user_name : userName},{_id: 0, performTask: 1, task: 1});
  const combinedArray = [...data.task.achieve_task, ...performTask];
  console.log(combinedArray)

  // create a Set to track unique names
  const uniqueNames = new Set();
  const uniqueArray = combinedArray.filter((item)=>{
    if(!uniqueNames.has(item)){
      uniqueNames.add(item);
      return true
    }
    return false;
  })
  console.log(uniqueArray)
  await db.collection('users').updateOne({user_name : userName}, {$set : {'task.achieve_task' : uniqueArray}});
}

async function writeStatistics (isReal, userName, historyData) {
  if (userName) {
    if (isReal) {
      const totalEarningInfo = await db.collection('users').findOne({user_name:userName},{_id : 0, total_earning:1})  ;
      console.log("total_earnning  ",totalEarningInfo.total_earning);
      const totalEarning = parseFloat(totalEarningInfo.total_earning) + (historyData.profit>0 ?parseFloat(historyData.profit):0);
      console.log("total_earning",totalEarning)
      let rankingIndex = 0;
      if(totalEarning<100) rankingIndex = 0;
      if(totalEarning>=100 && totalEarning < 500) rankingIndex = 1;
      if(totalEarning>=500 && totalEarning < 1000) rankingIndex = 2;
      if(totalEarning>=1000 && totalEarning < 5000) rankingIndex = 3;
      if(totalEarning>=5000 && totalEarning < 10000) rankingIndex = 4;
      if(totalEarning>=10000 && totalEarning < 50000) rankingIndex = 5;
      if(totalEarning>=50000 && totalEarning < 100000) rankingIndex = 6;
      if(totalEarning>=100000 && totalEarning < 500000) rankingIndex = 7;
      if(totalEarning>=500000 && totalEarning < 1000000) rankingIndex = 8;
      if(totalEarning>=1000000) rankingIndex = 9;
      db.collection('users').updateOne(
        { user_name: userName },
        { $push: { 'gamesHistory.real': historyData }, $inc: { 'balance.real': parseFloat(historyData.profit)}, 
        $set: {'total_earning' : parseFloat(totalEarning.toFixed(2)), 'ranking' :RANKING_DATA[rankingIndex] } })
    } else {
      db.collection('users').updateOne(
        { user_name: userName },
        { $push: { 'gamesHistory.virtual': historyData }, $inc: { 'balance.virtual': parseFloat(historyData.profit) } })
    }
  }
}

function nonNullRandom () {
  return Math.random() || nonNullRandom()
}

export  function startGame (connection, data, setStopFlag) {
  let result = (1 / nonNullRandom()).toFixed(2)
  let performTask = []
  if (data.isReal) {
    result = parseFloat(1+(result-1)*0.9).toFixed(2)
  }
  result = result > MAX_WIN ? MAX_WIN : result

  connection.sendUTF(JSON.stringify({ operation: 'started' }))

  const autoStop = parseFloat(data.autoStop)
  console.log(result," ",autoStop)

  if (result < autoStop) {
    const time = parseFloat(Math.sqrt((result-1) / ACCELERATION * 2).toFixed(2))
    continueCounter = 0;
    timeout = setTimeout(() => {
      setStopFlag();
      const currentDate = new Date();
      const historyData = {
        date: formatedDate,
        crash: result,
        bet: data.bet,
        stop: 'x',
        profit: -data.bet
      }
      connection.sendUTF(JSON.stringify({ operation: 'crashed', ...historyData }))
      writeStatistics(data.isReal, data.userName, historyData)
    }, time)
    
  } else {
    const time = parseFloat(Math.sqrt((autoStop-1) / ACCELERATION * 2).toFixed(0))
    timeout = setTimeout(() => {

      setStopFlag()
      continueCounter += 1;
      const historyData = {
        date: formatedDate,
        crash: 'x',
        bet: data.bet,
        stop: autoStop,
        profit: (data.bet * (autoStop - 1)).toFixed(2)
      }
      performTask = []
      performTask = TASK_LIST.reduce((performList, task,index)=>{
        
      if(autoStop>=task.limit && task.method === TASK_TYPE[0]) 
        performList.push(index);
      if(task.method === TASK_TYPE[1] && task.limit === continueCounter) 
        performList.push(index);
      
      return performList
      },[])
      connection.sendUTF(JSON.stringify({ operation: 'stopped', ...historyData }))
      writeStatistics(data.isReal, data.userName, historyData)
      writeTask(data.userName, performTask)
      
    }, time)
      
  }
  
  return Date.now()
}

export function stopGame (connection, startTime, bet, isReal, userName) {
  continueCounter = 0;
  clearTimeout(timeout)
  const time = Date.now() - startTime
  const result = ACCELERATION * time * time / 2
  const historyData = {
    date: formatedDate,
    crash: 'x',
    bet,
    stop: (result + 1).toFixed(2),
    profit: (bet * result).toFixed(2)
  }
  console.log("------------bet---------",startTime )
  connection.sendUTF(JSON.stringify({ operation: 'stopped', ...historyData }))
  writeStatistics(isReal, userName, historyData)
}
