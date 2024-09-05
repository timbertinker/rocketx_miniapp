import { useAtom } from "jotai";
import AtomLabel from "../atom/atom-label";
import ShadowButton from "../atom/shadow-btn";
import { userData } from "../../store";

const FriendEarned = ({ setIsModalOpen }) => {
    const [user,] = useAtom(userData)

    return (
        <div>
            <AtomLabel content={"Earned"} />
            <div className="w-full rounded-[8px] bg-[#FFFFFF33] mt-3 flex">
                <div className="w-1/2">
                    <div className="mx-auto flex gap-[2.5px] w-fit py-2">
                        <img
                            src="/image/coin-y.svg"
                            alt=""
                            className="w-6 h-6"
                        />
                        <span className="font-bold text-base text-white">{user.Balance}</span>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="mx-auto flex gap-[2.5px] w-fit py-2">
                        <img
                            src="/image/ton.svg"
                            alt=""
                            className="w-6 h-6"
                        />
                        <span className="font-bold text-base text-white">0</span>
                    </div>
                </div>
            </div>
            <ShadowButton className={"mt-4 invite-btn-gradient-border bg-[#3434DA]"} content={"Invite a friend"} action={() => setIsModalOpen(true)} />
        </div>
    )
}

export default FriendEarned;