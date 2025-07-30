import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { assets } from '../assets/assets';
import CompanyMarquee from './CompanyMarquee';
import Footer from './Footer';

function Hero() {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();

    function handleGuestContinue() {
        navigate('/transcribe');
    }

    function handleStartRecording() {
        navigate('/transcribe');
    }

    return (
        <div className="w-full px-4 sm:px-20 xl:px-32 pt-0 lg:pt-0 pb-20 flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 max-w-3xl mx-auto">
                Transcribe audio to text in seconds<br />
                using <span className="text-[#5044E5]">SpeechText.ai</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center mt-3 leading-relaxed max-w-xl mx-auto mb-8">
                Upload or record audio to get fast and accurate transcriptions.
                <br className="hidden sm:block" />
                AI-powered engine converts speech to text in seconds.
                <br className="hidden sm:block" />
                Translate and edit with ease — all in one simple tool.
            </p>




            {/* Conditional Buttons */}
            {user ? (
                <button
                    onClick={handleStartRecording}
                    className="w-56 h-11 bg-[#5044E5] text-white rounded-md  hover:bg-[#3e37c9] transition duration-200 flex items-center justify-center gap-2"
                >
                    Start Recording Now <ArrowRight className="w-4 h-4" />
                </button>
            ) : (
                <div className="flex flex-col sm:flex-row gap-6 mb-5">
                    <button
                        onClick={handleGuestContinue}
                        className="w-48 h-11 bg-gray-300 text-black rounded-md  hover:bg-gray-400 transition duration-200"
                    >
                        Continue as Guest
                    </button>
                    <button
                        onClick={openSignIn}
                        className="w-48 h-11 bg-[#5044E5] text-white rounded-md  hover:bg-[#3e37c9] transition duration-200 flex items-center justify-center gap-2"
                    >
                        Login / Sign Up <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Trusted by section */}
            <div className="flex flex-row-reverse items-center text-sm text-gray-600 gap-4 mt-0">
                <p className="flex items-center justify-center h-full text-base">Trusted by 10,000+ users</p>
                <div className="flex -space-x-4">
                    <img
                        className="w-30 h-10 rounded-full border-2 border-white object-cover"
                        src={assets.trusted}
                        alt="User avatar"
                    />
                </div>
            </div>

            {/* companies marque */}
            <CompanyMarquee/>

            {/* footer */}
            <Footer/>
        </div>
    );
}

export default Hero;
