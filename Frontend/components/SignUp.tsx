"use client";

import React, { useRef } from 'react';
import useModal from '@/hooks/modalStore'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import Modal from './Modal'

interface SignUpProps {
  darkMode: boolean;
}
const SignUp: React.FC<SignUpProps> = ({ darkMode }) => {
    
    const router = useRouter();
    const { onClose, isOpen } = useModal();
    const onChange = (open: boolean) => {
        if (!open) {
          onClose();
        }
      }

    return (
    <>
         <Modal 
            title="Sign Up" 
            description="" 
            isOpen={isOpen} 
            onChange={onChange} 
            >           
            <div className="px-6 py-8 rounded shadow-md text-white w-full" >
                        <input 
                            type="text"
                            className="text-white block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name" />
                        <input 
                            type="text"
                            className=" text-white block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />
                        <input 
                            type="password"
                            className=" text-white block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />
                        <input 
                            type="password"
                            className="text-white block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password" />
                        <button
                            type="submit"
                            className=" bg-indigo-500 w-full text-center py-3 rounded bg-green  hover:bg-green-dark focus:outline-none my-1"
                        >Create Account</button>
                            By signing up, you agree to the &nbsp;
                            <Link className="no-underline border-b border-grey-dark" href="#">
                                Terms of Service
                            </Link> and &nbsp;
                            <Link className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </Link>

                    <div className=" no-underline text-grey-dark mt-6" >
                        Already have an account? &nbsp;
                        <Link className="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </Link>.
                    </div>
            </div>
        </Modal >
    </>
    )
  }
  
  export default SignUp;