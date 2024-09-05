const TabButton = ({tabList, tabNo, setTabNo}) => {
    return (
        <div className="flex w-full p-1 gap-1 justify-between rounded-xl text-base font-bold bg-[#1414AA] text-white">
            {
                tabList.map((_tab, _index) => (
                    <div 
                        className={`rounded-lg items-center  py-1 w-1/2 ${tabNo == _tab.id && 'bg-[#3861FB99]'}`}
                        onClick={() => setTabNo(_tab.id)}
                        key={_index}
                    >
                        <div className="flex gap-[6px] mx-auto w-fit">
                            <img 
                                src={`image/${_tab.src}`}
                                className="w-6 h-6"
                            />
                            <div>{_tab.amount}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TabButton;