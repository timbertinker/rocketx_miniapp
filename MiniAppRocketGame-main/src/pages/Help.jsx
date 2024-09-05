import ShadowButton from "../component/atom/shadow-btn";
import SwitchButton from "../component/atom/switchButtton";
import SwitchButtonOption from "../component/atom/switchButtonOption";
import InputNumber from "../component1/InputNumber";
import TgIcon from "../assets/icon/tg-icon";
import TgTwitter from "../assets/icon/tg-twitter";
import TgYout from "../assets/icon/tg-yout";
import TgInst from "../assets/icon/tg-inst";

const Help = () => {
    const operationOption = ['Increase Bet by', 'Return to base Bet'];
    const setData = () => {}

    return (
        <div className="flex flex-col gap-8 items-center h-[90vh] pb-4 overflow-y-auto">
            <div className="flex flex-col gap-4 items-center">
                <div className="text-[20px] text-blueFaded">🎲 <span className="text-[17px]">How to play</span></div>
                <div className="text-white text-[15px]">Place your bet and press the Start button to launch the rocket! As the rocket flies, a multiplier increases your bet. Press the Stop button to get your profit! But be careful, because the rocket can crash at any moment, and if it does, you'll lose your bet!</div>
                <div className="rounded-2xl bg-[#FFFFFF80] p-4 w-full">
                    <div className="flex gap-4 justify-between w-full">
                        <div className="w-1/2">
                            <ShadowButton className="w-full py-[14px] text-[16px] font-bold text-white" content={"start"} />
                        </div>
                        <div className="w-1/2">
                            <ShadowButton className="w-full bg-[#CC070A] py-[14px] text-[16px] font-bold text-white shadow-btn-red-border invite-btn-red-shadow" content={"stop"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <div className="text-[20px] text-blueFaded">🎛 <span className="text-[17px]">Game modes</span></div>
                <div className="text-white text-[15px]">You can play in Manual or Auto mode. In both modes you can specify an automatic stop to stop the rocket and get reward.</div>
                <div className="rounded-2xl bg-[#FFFFFF80] p-4 w-full flex justify-center">
                    <div className={`flex flex-row justify-center text-base font-medium`}>
                        <span className={'text-[#3861FB]'}>Manual</span>
                        <SwitchButton checked={true} />
                        <span className={`selected text-white`}>Auto</span>
                    </div>
                </div>
                <div className="text-white text-[15px]">In automatic mode the rocket will be launched automatically until you press the stop button.</div>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <div className="text-[20px] text-blueFaded">👨‍🚀 <span className="text-[17px]">Build your strategy</span></div>
                <div className="text-white text-[15px]">In automatic mode you can set up a betting strategy so that the bet automatically increases according to the specified coefficient or resets to the original value in case of winning or losing.</div>
                <div className="rounded-2xl bg-[#FFFFFF80] p-4 w-full">
                    <div className="flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-col w-full gap-1">
                                <div className="text-sm leading-5 text-white">If Lose</div>
                                <SwitchButtonOption contents={operationOption} slot={"Increase Bet by"} setSlot={setData}/>
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <div className="text-sm leading-5 text-white">Coefficeent</div>
                                <InputNumber InputProps={{ value: 2, min: 1.01, max: 100, step: 1, type: "xWithNumber", disabled: false }} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-col w-full gap-1">
                                <div className="text-sm leading-5 text-white">If Win</div>
                                <SwitchButtonOption contents={operationOption} slot={"Increase Bet by"} setSlot={setData}/>
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <div className="text-sm leading-5 text-[#FFFFFF99]">Coefficeent</div>
                                <InputNumber InputProps={{ value: 2, min: 1.01, max: 100, step: 1, type: "xWithNumber", disabled: true }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center w-full">
                <div className="text-[20px] text-blueFaded">📢 <span className="text-[17px]">Any questions?</span></div>
                <div className="text-white text-[15px]">Join our social media to stay up to date:</div>
                <div className="px-8 flex justify-between w-full">
                    <ShadowButton className={"w-8 h-8 flex justify-center p-0 items-center rounded-lg"} content={<TgIcon />}></ShadowButton>
                    <ShadowButton className={"w-8 h-8 flex justify-center p-0 items-center rounded-lg"} content={<TgTwitter />}></ShadowButton>
                    <ShadowButton className={"w-8 h-8 flex justify-center p-0 items-center rounded-lg"} content={<TgInst />}></ShadowButton>
                    <ShadowButton className={"w-8 h-8 flex justify-center p-0 items-center rounded-lg"} content={<TgYout />}></ShadowButton>
                </div>
            </div>
        </div>
    )
}

export default Help;