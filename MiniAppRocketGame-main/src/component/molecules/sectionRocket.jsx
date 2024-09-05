import React from "react";
import PannelScale from "../atom/pannelScale";
import PannelRocket from "../atom/pannelRocket";

const SectionRocket = () =>{
  return(
    <div className="flex p-4  w-full gap-9  relative">
      <PannelScale from = "1" to = "2" direction="left"/>
      <div className="w-full  justify-between items-center">
        <PannelRocket amount = "10.00"/> 
      </div>
      
      <PannelScale from = "1" to = "2" direction="right"/>

    </div>
  )
}

export default SectionRocket;