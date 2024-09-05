import React, { useCallback, useState } from "react";

const ScrollModal = ({ children, icon, title, isOpen, setIsOpen }) => {

    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsExiting(false);
        }, 500); // Match this duration with your animation duration
    };
    // Handle clicks on the backdrop
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            handleClose()
        }
    }, [setIsOpen]);

    // Return null if the modal is not open
    if (!isOpen && !isExiting) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-30 animate-fade-out z-10" 
            onClick={handleBackdropClick}
        >
            <div 
                className={
                    `absolute bottom-0 rounded-tl-[10px] rounded-tr-[10px] w-full bg-gradient-to-b from-[#1414AA] to-[#000075]
                    ${isExiting ? 'animate-slide-out-bottom' : 'animate-slide-in-top'}`
                }
            >
                <div className="w-full py-[18px] relative">
                    <div className="flex items-center gap-[6px] mx-auto text-blueFaded text-[17px] font-bold w-fit">
                        {icon}
                        <div>{title}</div>
                    </div>
                    <div className="absolute top-[9px] left-1/2 transform -translate-x-1/2">
                        <img 
                            src="/image/icon/grabber.svg"
                            alt="Grabber Icon"
                            className="w-[36px] h-[5px]"
                        />
                    </div>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2" onClick={handleClose}>
                        <img 
                            src="/image/icon/close-button.svg"
                            alt="Close Button"
                            className="w-[30px] h-[30px]"
                        />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default ScrollModal;