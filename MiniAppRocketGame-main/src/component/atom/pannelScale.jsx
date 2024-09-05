import React from "react";

const PannelScale = ({from, to, direction}) =>{
  
  return(
    <>
    { direction ==="left" &&
    (
      <div className = "flex flex-col absolute left-4  py-[42.5px] top-0 px-0 gap-20 items-center text-white ">
      <div className="flex w-full gap-4 items-center content-center">
        <div>{`x${to}`}</div>
        <hr className="w-3 h-height_1px"/>
      </div>

      <hr className="w-1 h-height_1px"/>

      <div className="flex w-full gap-4 items-center text-justify">
        <div>{`x${from}`}</div>
        <hr className="w-3 h-height_1px"/>
      </div>
    </div>
    ) 
    } 
    {
    direction ==="right" &&(
    <div className = "flex flex-col absolute right-4 top-0 py-[42.5px] px-0 gap-20 items-center text-white">
      <div className="flex w-full gap-4 items-center justify-center">
        <hr className="w-3 h-height_1px"/>
        <div>{`x${to}`}</div>
      </div>

      <hr className="flex w-1"/>

      <div className="flex w-full gap-4 items-center text-justify">
       <hr className="w-3 h-height_1px"/>
        <div>{`x${from}`}</div>
      </div>
    </div>)
    }
    </>
    
  )
}
export default PannelScale;