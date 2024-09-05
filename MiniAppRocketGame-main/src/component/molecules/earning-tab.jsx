import AtomLabel from "../atom/atom-label";
import TabButton from "../atom/tab-button";

const EarningTab = ({
    tabList, tabId, setTabId
}) => {
    return (
        <div className="flex flex-col gap-2">
            <AtomLabel content={"Earned"} />
            <TabButton tabList={tabList} tabNo={tabId} setTabNo={setTabId} />
        </div>
    );
}

export default EarningTab;