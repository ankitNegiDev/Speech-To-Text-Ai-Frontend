import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

function Navbar() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

    function redirectToHome() {
        navigate("/");
    }

    return (
        <div className="fixed top-0 left-0 z-50 w-full bg-white/70 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-2 sm:py-2.5 lg:py-3">
                    {/* Logo + Brand */}
                    <div
                        onClick={redirectToHome}
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer transition-transform duration-200 hover:scale-105 hover:brightness-110"
                    >
                        <img
                            src={assets.icon}
                            alt="logo"
                            className="w-8 sm:w-9 md:w-10"
                        />
                        <span className="text-base sm:text-lg md:text-xl font-semibold sm:font-bold text-[#5044e5] tracking-tight">
                            SpeechText.ai
                        </span>
                    </div>

                    {/* Auth Button / User */}
                    <div className="flex items-center">
                        {user ? (
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonBox: "w-10 h-10 sm:w-11 sm:h-11",
                                        userButtonAvatarBox: "w-10 h-10",
                                    },
                                }}
                            />
                        ) : (
                            <button
                                onClick={openSignIn}
                                className="flex items-center gap-2 rounded-full 
                                    text-sm sm:text-base font-medium 
                                    bg-[#5044E5] hover:bg-[#3f38c6] text-white 
                                    px-4 sm:px-5 py-1.5 sm:py-2 
                                    shadow-sm transition-all duration-200 
                                    hover:scale-105"
                            >
                                <span>Get started</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
