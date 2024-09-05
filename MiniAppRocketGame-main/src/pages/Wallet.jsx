import { useState } from "react";
import AtomLabel from "../component/atom/atom-label";
import ShadowButton from "../component/atom/shadow-btn";
import WalletInfo from "../component/atom/wallet-info";

const Wallet = () => {

    const [walletAddress, setWalletAddress] = useState("");

    return (
        <div className="h-full pb-[76px] flex flex-col">
            <div className="flex-auto flex" style={{ height: "calc(100vh - 320px)" }}>
                <div className="my-auto flex flex-col items-center text-center gap-4 h-fit">
                    <img
                        src="/image/main/ton.png"
                        alt=""
                        className="h-full max-w-[200px]"
                    />
                    <div className="text-[15px] text-white">
                        Connect your TON wallet to be able to play with TON and receive rewards from the platform.
                    </div>
                </div>
            </div>
            <div className="w-full">
                <AtomLabel content={"Wallet"} />
                <WalletInfo className={"mt-2"} address={walletAddress} />
                <ShadowButton
                    className={"mt-4"}
                    content={walletAddress ? "Disconnect wallet" : "Connect wallet"}
                    action={() => setWalletAddress((address) => address ? "" : "UQ67wW...UQ67wW")}
                />
            </div>
        </div>
    )
}

export default Wallet;