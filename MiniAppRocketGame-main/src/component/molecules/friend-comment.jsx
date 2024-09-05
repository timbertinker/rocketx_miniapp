import AtomBadge from "../atom/atom-badge";
import AtomLabel from "../atom/atom-label";

const FriendComment = ( {friendData} ) => {
    return (
        <div className="flex justify-between items-center">
            <AtomLabel content={"Friends"} />
            <AtomBadge content={friendData.length} />
        </div>
    )
}

export default FriendComment;