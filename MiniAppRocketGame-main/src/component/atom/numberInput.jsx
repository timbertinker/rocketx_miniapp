import React, { useState } from "react";

const NumberInput = ({title, input, infoInputNumber}) =>{
  const [numberValue, setNumberValue] = useState(input);
  return(
    <div className="flex flex-col text-white w-full">
      <p className="text-sm leading-5">{title}</p>
      <input type="number" className="bg-white w-full h-[42px] rounded-xl \
        o outline-[#0000ff4d] outline-4 text-black p-1 " value={numberValue} 
        onChange={(e)=>setNumberValue(e.target.value)}/>
      <p className="text-xs leading-[14px]">{infoInputNumber}</p> 
    </div>
  )
}

export default NumberInput;