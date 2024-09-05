import React from "react";
import { Img } from "../assets/image";

const Header = () =>{
  return(
    <div className="flex w-full py-[7px] text-white text-[17px] font-medium \
          leading-[22px] justify-between items-center text-center top-3 box-border p-4 ">
      <div>Close</div>
      <div className="flex flex-col">
        <p>Rocket X</p>
        <p className="text-xs leading-[14px]">mini app</p>
      </div>
      <div>
        <img src={Img.trailingButton} width={22} height={22} alt="trailingButton"/>
      </div>
    </div>
  )

}

export default Header;