import React from "react";

const Layout = ({children}) =>{
  return(
    <div className={`p-4 h-screen bg-gradient-to-b from-[#0000D0] to-[#9393EB] absolute bottom-0 w-full`}>
      {children}
    </div>
  )
}

export default Layout;