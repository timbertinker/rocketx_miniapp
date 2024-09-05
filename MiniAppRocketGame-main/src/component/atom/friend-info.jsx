const FriendInfo = ( { data }) => {
    return (
        <div className="flex justify-between rounded-[10px] bg-[#0000001A] py-2 px-4 items-center">
            <div className="flex gap-2 items-center">
                <img 
                    src={`/image/avatar/${data.url}`}
                    alt=""
                    className="w-8 h-8"
                />
                <div className="flex flex-col text-[14px] text-white font-bold">
                    <div>{data.name}</div>
                    <div>{`${data.label} · ${data.rate}/10`}</div>
                    <div className="#fffff99 font-normal">{data.id}</div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end text-white" >
                <div className="flex items-center gap-2 text-[14px] font-medium">
                    <img 
                        src="/image/coin-y.svg"
                        alt=""
                        className="w-6 h-6"
                    />
                    <div>
                        {data.coin > 0 ? `+${data.coin}` : 0}
                    </div>
                </div>
                <div>
                    {data.ton > 0 ? `+${data.ton}` : 0}
                </div>
            </div>
        </div>
    )
}

export default FriendInfo;