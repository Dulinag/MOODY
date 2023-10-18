"use client"
import React,{ useRef } from 'react';
import Header from "@/components/Header"
import SignUp from '@/components/SignUp';

interface SignUpProps {
  darkMode: boolean;
}
const SingUpPage = () => {
  const signUpRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (signUpRef.current) {
      signUpRef.current.focus();
    }
  };
  return (
    <>
    <div className="    
            h-fit
            bg-gradient-to-b
            from-purple-400/50
            p-6
     ">      
            
            <SignUp darkMode={false}/>
    </div>
          </>
        )
  
}

export default SingUpPage