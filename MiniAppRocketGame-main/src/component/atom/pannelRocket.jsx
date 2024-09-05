import React from "react";
import { Img } from "../../assets/image";
const PannelRocket = ({amount}) =>{
  return(
    <div className="flex flex-col h-[283px] justify-between items-center">
      <div className="flex gap-2 items-center">
        <img src = {Img.coin} width={44} height={44} className="max-w-11 h-11" alt = "coin" />
        <p className="text-[40px] text-white font-extrabold">{amount}</p>
      </div>
      <div>
        <img src = {Img.counter3} />
      </div>
      <div>
        <img src = {Img.rocketInactive} width={76} height={64} className="w-[76] h-16" alt = "rocket-inactive"/>
      </div>
      
      
    </div>
  )
}

export default PannelRocket;