import React, { useCallback, useState } from "react";

const InfoModal = ({ children, icon, title, isOpen, setIsOpen, height }) => {

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
                    `absolute flex flex-col ${height}  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl  w-[calc(100vw-32px)] p-4 gap-6 bg-white
                    ${isExiting ? 'animate-slide-out-bottom' : 'animate-slide-in-top'}`
                }
            >       

                    <div className="flex">
                        <div className="text-[17px] leading-5 w-full text-[#0D1421] text-center tracking-[-0.23px] font-extrabold ">
                        {title}
                        </div>
                        <div className="absolute top-4 right-4 transform " onClick={handleClose}>
                        <img 
                            src="/image/icon/close-dark.svg"
                            alt="Close Button"
                            className="w-[20px] h-[20px]"
                        />
                        </div>

                    </div>
                    
                <div className="flex flex-col gap-6">
                    {children}
                </div>
                
            </div>
        </div>
    );
};

export default InfoModal;