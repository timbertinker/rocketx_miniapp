const StatInfo = ({data}) => {
    return (
        <div>
            <div className="text-blueFaded border-b border-white_20 px-4 py-2">
                {data.date}
            </div>
            {
                data.data.map((_data, _index) => (
                    <div className={`px-4 py-2 w-full justify-between rounded-[8px] text-white items-center flex ${_index % 2 != 0 && "bg-[#0000001A]"}`} key={_index}>
                        <div>{Number(_data.bet).toFixed(2)}</div>
                        <div>
                            {
                                _data.stop > 0 ?
                                `x${Number(_data.stop).toFixed(2)}` :
                                <img 
                                    src="/image/icon/cross.svg" 
                                    alt="" 
                                    className="w-4 h-4"
                                />
                            }
                        </div>
                        <div className={`${_data.stop > 0 ? "text-[#84CB69]" : "text-[#F56D63]"}`}>
                            {
                                _data.stop > 0 ?
                                `+${((_data.stop-1) * _data.bet).toFixed(2)}` :
                                `-${_data.bet}`
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default StatInfo;