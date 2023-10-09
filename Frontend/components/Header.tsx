"use client";
import {useRouter} from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import React, {useState, useRef, useEffect} from 'react';
import SignUp from './SignUp'
import Login from "./Login"

interface HeaderProps {
    children: React.ReactNode;
    className ?: string;
}
const Header:React.FC<HeaderProps> = ({children, className}) => {
  const router =useRouter();

  
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const signUpRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSignUp && signUpRef.current) {
      signUpRef.current.focus();
    }
    if (showLogin && loginRef.current) {
      loginRef.current.focus();
    }
  }, [showSignUp, showLogin]);

  const handleLogour = () => {

    //handle logout in future
  }
    return (
    <div className={
        twMerge(`
        h-fit
        bg-gradient-to-b
        from-purple-400/50
        p-6`,className)
    }>
        <div className="
        w-full
        nb-4
        flex
        items-center
        justify-between">
            <div className="hidden md:flex gap-x-2 items-center">
                <button 
                onClick={()=> router.back()}
                className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                    <RxCaretLeft className='text-white'  size={35}/>
                </button>
                <button 
                onClick={()=> router.forward()}
                className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                    <RxCaretRight className='text-white'  size={35}/>
                </button>
            </div>
            <div className="flex md:hidden gap-x-2 items-center">
                <button 
                    className="
                        rounded-full
                        p-2
                        bg-white
                        flex
                        items-center
                        jusitfy-center
                        hover:opacity-75
                        transition">
                    <HiHome className="text-black" size={20}/>
                </button>
                <button 
                    className="
                        rounded-full
                        p-2
                        bg-white
                        flex
                        items-center
                        jusitfy-center
                        hover:opacity-75
                        transition">
                    <BiSearch className="text-black" size={20}/>
                </button>
            </div>
            <div 
                className="
                flex
                justify-between
                items-center
                gap-x-4">
                    <>
                        <div>
                            <Button 
                            onClick={() => {
                                setShowSignUp(true);
                                setShowLogin(false); // Close Login when SignUp is clicked
                              }}
                            className=" 
                                bg-transparent
                                text-neutral-300
                                font-medium">
                                Sign Up
                            </Button>
                        </div>
                        <div>
                            <Button 
                onClick={() => {
                    setShowLogin(true);
                    setShowSignUp(false); // Close SignUp when Login is clicked
                  }}
                 className=" 

                                bg-white
                                px-6
                                py-2">
                                Log In
                            </Button>
                        </div>
                    </>
            </div>
        </div>
        {children}
        {showLogin && <Login darkMode={false} />} {/* Render the SignUp component if showSignUp is true */}

     
     
        {showSignUp && <SignUp darkMode={false} />} {/* Render the SignUp component if showSignUp is true */}
   
   
    </div>
  )
}

export default Header