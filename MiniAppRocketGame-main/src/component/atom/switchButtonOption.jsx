import React from "react";
import { cn } from "../../utils";

const SwitchButtonOption = ({contents, setSlot, slot}) =>{
  const switchButtonItems = contents.map((data,index) =>{
   const disabled = (data !== slot);
    return(
      <button className={cn("w-1/2 text-center h-8 py-1 rounded-lg text-white text-base font-medium leading-[18.75px] shadow-none", 
        disabled ? "bg-transparent" : "bg-[#3861FB99]")} key = {index} onClick = {()=>setSlot(data)} >
        {data}
      </button>
    )
  });
  return(
    <div className="flex w-full h-10 bg-[#1414AA] rounded-xl p-1 gap-1">
      {switchButtonItems}
    </div>
  )
}

export default SwitchButtonOption;