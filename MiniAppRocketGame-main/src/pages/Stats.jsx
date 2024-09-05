import { useState } from "react";
import AtomLabel from "../component/atom/atom-label";
import TabButton from "../component/atom/tab-button";
import StatList from "../component/molecules/stat-list";
import { useAtom } from "jotai";
import { userData } from "../store";



const Stats = () => {
    const [ tabId, setTabId ] = useState(1);
    const [user,] =useAtom(userData)
    const statsList = [
        {
            src: "coin-y.svg",
            amount: user.Balance,
            id: 1
        },
        {
            src: "ton.svg",
            amount: "0",
            id: 2
        }
    ]
    return (
        <div className="flex flex-col">
            <div className="mt-2">
                <TabButton tabList={statsList} tabNo={tabId} setTabNo={setTabId} />
            </div>
            <div className="mt-4">
                <StatList />
            </div>
        </div>
    )
}

export default Stats;