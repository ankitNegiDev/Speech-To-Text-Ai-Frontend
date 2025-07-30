import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
    return (
        <footer className="w-full fixed bottom-0 left-0 bg-[#0f0f0f] text-gray-400 py-4 px-6 border-t border-gray-800 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
                <p className="mb-2 md:mb-0">&copy; 2025 SpeechText.ai — All rights reserved.</p>

                <div className="flex gap-6 items-center">
                    <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
                    <div className="flex gap-4 ml-4">
                        <a href="#" className="hover:text-white">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="#" className="hover:text-white">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="#" className="hover:text-white">
                            <Twitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
