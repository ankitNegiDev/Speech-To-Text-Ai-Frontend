import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {ArrowRight, User} from 'lucide-react'

import {useClerk , UserButton , useUser} from '@clerk/clerk-react'

function Navbar(){
    const navigate=useNavigate();
    const {user}=useUser();
    const {openSignIn}=useClerk();

    function redirectToHome(){
        navigate('/');
    }

    return(
        <>
            <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 ">
                <img  src={assets.logo} alt="logo" className="w-32 sm:w-44 cursor-pointer"  onClick={redirectToHome}/>
                {/* if user is loged in then show userprofile else show a button get started. */}
                {
                user ? <UserButton /> 
                : (
                    <button onClick={openSignIn} className="flex items-start gap-2 rounded-full text-sm cursor-pointer bg-[#5044E5] text-white px-10 py-2.5"> Get started <ArrowRight className="w-4 h-4" /></button>)
                }
            </div>
        </>
    );
}

export default Navbar;

// time stamp is 49: min 
// start with home page -- like what to show -- clerk is setup in frontend -- and left 