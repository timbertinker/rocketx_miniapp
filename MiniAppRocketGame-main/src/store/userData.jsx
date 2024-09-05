import { atom } from "jotai";

export const userData = atom({
  RealName : "", UserName : "", 
  Balance : {Real:0, Virtual : 0}, 
  Rank : 0, Ranking : 1, 
  GameWon : 0,GameLost : 0
});