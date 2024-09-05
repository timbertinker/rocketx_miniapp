import { cn } from "../../utils"

const ShadowButton = ( {className, content, action, disabled} ) => {
    return (
        <button 
            className={cn("rounded-[12px] w-full text-center py-[14px] text-[16px] font-bold cursor-pointer border border-solid border-transparent shadow-btn-blue-border bg-[#3434DA] text-white invite-btn-shadow", className)}
            onClick={action && action}
            disabled={disabled}
        >
            { content }
        </button>
    )
}   

export default ShadowButton;