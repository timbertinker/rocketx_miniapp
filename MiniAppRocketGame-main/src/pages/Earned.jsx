import { useState } from "react";
import EarningTab from "../component/molecules/earning-tab";
import EarningTask from "../component/molecules/earning-task";
import { useAtom } from "jotai";
import { userData } from "../store";



const Earned = () => {
    const [user,] = useAtom(userData)
    const tabList = [
        {
            id: 1,
            src: "coin-y.svg",
            amount: user.Balance
        },
        {
            id: 2,
            src: "ton.svg",
            amount: 0
        }
    ]

    const [tabId, setTabId] = useState(1);

    return (
        <div className="flex flex-col h-full gap-4">
            <EarningTab tabList={tabList} tabId={tabId} setTabId={setTabId} />
            <EarningTask />
        </div>
    )
}

export default Earned;