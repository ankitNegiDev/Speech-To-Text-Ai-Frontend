import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { assets } from '../assets/assets';
import CompanyMarquee from './CompanyMarquee';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useCallback } from 'react';

function Hero() {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();

    const handleGuestContinue = useCallback(() => {
        navigate('/transcribe');
    }, [navigate]);

    const handleStartRecording = useCallback(() => {
        navigate('/transcribe');
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 text-center">
            {/* Main Content */}
            <div className="flex-grow flex flex-col justify-between px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 pt-20 pb-10">
                <div className="flex flex-col items-center justify-center gap-10 h-full">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-4xl  lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                            Transcribe audio to text in seconds
                            <br />
                            <span className="mt-1 lg:mt-3 block">
                                using <span className="text-[#5044E5]">SpeechText.ai</span>
                            </span>
                        </h1>

                        <p className=" text-sm mt-7 sm:mt-8 lg:text-lg text-[#4A5565] leading-relaxed max-w-2xl mx-auto">
                            Upload or record audio to get fast accurate transcriptions.<br />
                            AI-powered engine converts speech to text in seconds.<br />
                            Translate and edit with ease — all in one simple tool.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {user ? (
                            <button
                                onClick={handleStartRecording}
                                className="group px-6 py-3 bg-[#5044E5] text-white text-base sm:text-lg rounded-full hover:bg-[#3e37c9] transition duration-200 flex items-center gap-2 shadow-md hover:shadow-xl"
                            >
                                Start Recording Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center justify-center">
                                <button
                                    onClick={handleGuestContinue}
                                    className="px-6 py-3 bg-gray-200 text-gray-800 text-base sm:text-base rounded-full hover:bg-gray-300 hover:scale-105 transition-all duration-200 shadow"
                                >
                                    Continue as Guest
                                </button>
                                <button
                                    onClick={openSignIn}
                                    className="group px-6 py-3 bg-[#5044E5] text-white text-base sm:text-base rounded-full hover:bg-[#3e37c9] transition flex items-center gap-2 shadow-md hover:shadow-xl"
                                >
                                    Login / Sign Up
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* Trusted Users */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={assets.trusted}
                                alt="Trusted user"
                                className="w-24 h-10 lg:w-32 lg:h-10 sm:w-28 sm:h-12 rounded-full border-2 border-white object-cover"
                            />
                            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-600">
                                Trusted by 10,000+ users
                            </p>
                        </div>
                    </motion.div>

                    {/* Company Logos Marquee */}
                    <div className="w-full max-w-5xl px-2">
                        <CompanyMarquee />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Hero;
