
import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
    return (
        <footer className="w-full fixed bottom-0 left-0 z-50 bg-[#0f0f0f] text-gray-300 px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-800 ">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0">

                {/* Left: Copyright */}
                <p className="text-base md:text-base text-center md:text-left tracking-wide leading-snug">
                    &copy; 2025 <span className="text-white font-semibold">SpeechText.ai</span> — All rights reserved.
                </p>

                {/* Right: Links + Socials */}
                <div className="flex flex-col sm:flex-row items-center gap-y-3 sm:gap-y-0 gap-x-6 sm:gap-x-8">

                    {/* Text Links */}
                    <div className="flex gap-4 text-xs sm:text-sm md:text-base">
                        {["Privacy", "Terms", "Contact"].map((text) => (
                            <a
                                key={text}
                                href="#"
                                className="transition-all duration-200 hover:text-white hover:opacity-90 hover:-translate-y-[1px] hover:scale-[1.03]"
                            >
                                {text}
                            </a>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        {[Github, Linkedin, Twitter].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="transition-all duration-200 hover:text-white hover:opacity-90 hover:-translate-y-[2px] hover:scale-105"
                                aria-label="Social Icon"
                            >
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
