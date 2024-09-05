import React, { useState } from "react";
import { useLocation } from "react-router";
import ToggleButton from "../component/atom/toggleButton";
import NavEarn from "../component/svg/nav_earn";
import NavFriends from "../component/svg/nav_friends";
import NavPlay from "../component/svg/nav_play";
import NavWallet from "../component/svg/nav_wallet";
import NavStats from "../component/svg/nav-stats";
import { isActionState } from "../store";
import { useAtom } from "jotai";

const footerData = [
  { img: <NavPlay color="white" />, text: "play" },
  { img: <NavEarn color="white" />, text: "earn" },
  { img: <NavFriends color="white" />, text: "friends" },
  { img: <NavStats color="white" />, text: "stats" },
  { img: <NavWallet color="white" />, text: "wallet" },
]


const Footer = () => {
  const [isVisuable,] = useAtom(isActionState);
  const location = useLocation().pathname;

  const footerItems = footerData.map((data, index) => {
    return (
      <ToggleButton key={index}
        img={data.img}
        text={data.text}
        bgColor={" bg-white bg-opacity-40 "}
        textColor={"text-white"}
        fgColor={" bg-transparent "}
        disabled={location === `/${data.text}` || (location == "/" && data.text == "play")}
      />
    )
  })
  return (
    <div className={`fixed transition transform bottom-0 p-4 w-full z-[1] ${isVisuable == "start" ? "translate-y-20" : ""}`}>
      <div className="flex bg-bgNavbar w-full gap-1.5 h-15 rounded-xl p-[5px] justify-between">
        {footerItems}
      </div>
    </div>

  )
}

export default Footer;