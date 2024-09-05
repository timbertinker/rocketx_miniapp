import { cn } from "../../utils";
import NavWallet from "../svg/nav_wallet";
import CheckMark from "../svg/check-mark";

const WalletInfo = (
    {
        address,
        className
    }
) => {
    return (
        <div className={cn("rounded-[12px] bg-[#1414AA] py-[10px] px-3 flex flex-row justify-between w-full text-blueFaded" , className)}>
            <div className="flex flex-row gap-3">
                <NavWallet />
                <div className={`text-base font-medium ${address ? "text-white" : "text-blueFaded"}`}>
                    {
                        address ? address : "Not connected"
                    }
                </div>
            </div>
            <div>
                {
                    address && 
                    <div className="text-[#84CB69]">
                        <CheckMark />
                    </div>
                }
            </div>
        </div>
    )
}

export default WalletInfo;