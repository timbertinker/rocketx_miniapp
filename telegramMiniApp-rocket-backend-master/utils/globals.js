import aes256 from 'aes256'

const key = 'y5*)Q:J1IqFj|)g^/2<2)MM0i'
export const cipher = aes256.createCipher(key)

 /**
 * Database connection handler
 */
export let db

export function setDb (i) {
  db = i
}

export const MAX_WIN = 100
const MAX_TIME = 100000
export const ACCELERATION = (MAX_WIN - 1) / MAX_TIME / MAX_TIME * 2
export const RANKING_DATA = [ 
  "Beginner", "Pilot", "Explorer", "Astronaut",
  "Captain", "Commander", "Admiral", "Legend", 
  "Master of the Universe", "God of Space"
]
export const TASK_TYPE = ["X increase", "continuese"]
export const TASK_LIST =[
  {method : TASK_TYPE[0], limit : 5, value : 50},
  {method : TASK_TYPE[0], limit : 10, value : 100},
  {method : TASK_TYPE[0], limit : 50, value : 300},
  {method : TASK_TYPE[1], limit : 3, value : 50},
  {method : TASK_TYPE[1], limit : 5, value :300}
]
