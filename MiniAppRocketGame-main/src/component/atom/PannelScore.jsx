import React from "react";
import { cn } from "../../utils";

const PannelScore = ({img, text2, text3, className = ""}) =>{
  return (
    <div className={cn("flex flex-row bg-white_20 rounded-lg gap-2 py-1 px-[10.5px] w-24 text-base leading-5 font-roboto text-white justify-center", className)}>
      <div className="flex gap-1 text-white">
        <img src = {img} width = {20} height={20} className="w-5 h-5" alt="scoreImg" />
        <p className="text-sm leading-5 font-normal">{text2}</p>
      </div>
      <p className=" font-medium ">
        {text3}
      </p>
    </div>
  )
}

export default PannelScore;