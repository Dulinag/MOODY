"use client"
import React,{ useRef } from 'react';
import Header from "@/components/Header"

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
        <div className="flex justify-center items-center h-full pt-400 bg-neutral-900 p-6 "  onClick={handleClick}>
          <div className={` min-h-screen flex flex-col`}>
          <div className=" container relative max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 :hover {}">                
          <div className="px-8 mt-30 rounded shadow-md  w-full ">
            <h1 className="mb-8 text-3xl  text-center">Sign up</h1>
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
              className=" bg-indigo-500 w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >Create Account</button>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the &nbsp;
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Terms of Service
              </a> and &nbsp;   
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Privacy Policy
              </a>
            </div>
          </div>
              <div className="text-grey-dark mt-6">
                Already have an account ? &nbsp;
                <a className="no-underline border-b border-blue text-blue" href="../login/">
                  Log in
                </a>.
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default SingUpPage