import React from "react"
import PannelScore from "../atom/PannelScore";
import { Img } from "../../assets/image";
import { avatar } from "../../assets/avatar";

const SectionScore = () =>{
  return(
    <div className="flex w-full bg-white_20 justify-between p-2 rounded-[10px] text-white text-base leading-5">
        <div className="flex gap-2.5">
          <img src={avatar.avatar1} width="64px" height="64px" className="max-w-16 h-16"  alt = "avatar" />
          <div className="flex flex-col w-full gap-0.5">
            <p className="font-semibold">Sergei Kovtun</p>
            <p className="font-semibold">Beginner · 1/10</p>
            <p>1808944</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <PannelScore img = {Img.agree} text2 = {"Won"} text3={"48"}/>
          <PannelScore img = {Img.disagree} text2 = {"Lost"} text3={"32"}/>
        </div>
    </div>
  )
}

export default SectionScore;
