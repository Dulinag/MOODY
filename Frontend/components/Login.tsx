"use client";

import React, {useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import useModal from '@/hooks/modalStore'
import Modal from './Modal'
import ApiUsers from "../Api/UsersApi"

interface SignUpProps {
  darkMode: boolean;
}
const Login: React.FC<SignUpProps> = ({ darkMode }) => {

    const router = useRouter();
    const { onClose, isOpen } = useModal();

    useEffect(() => {
        //handle user session here later
      }, );
    
      const onChange = (open: boolean) => {
        if (!open) {
          onClose();
        }
      }
      const emailOrUsernameRef = useRef<any>(null)
      const passwordref = useRef<any>(null)
      const [users, setUsers] = useState({ error: "" });


      const loginUser = async (e) => {
        e.preventDefault();
      
        const username = emailOrUsernameRef.current.value;
        const password = passwordref.current.value;
      
        // Simple validation checks
        if (!username || !password) {
            setUsers({ error: "All fields are required." });
          return;
        }
      
        try {
            const result = await ApiUsers.post("/users/login", { username, password });
            setUsers(result.data);
          } catch (error: any) {
            if (error.response && error.response.status === 401) {
              setUsers({ error: "Invalid credentials. Please check your email and password." });
            } else {
              console.error('Error logging in:', error);
              setUsers({ error: "An error occurred while logging in." });
            }
          }
          
          
          
      }
      
    return (
    <>
        <Modal 
        title="Login" 
        description="" 
        isOpen={isOpen} 
        onChange={onChange} 
        > <form onSubmit={loginUser}>
                    <input
                        ref = {emailOrUsernameRef} 
                        type="text"
                        className=" text-white block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email or Username" />
                        
                    <input 
                        ref = {passwordref}
                        type="password"
                        className=" text-white block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    <button
                        type="submit"
                        className=" bg-indigo-500 w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                    >Login</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By Logining in, you agree to the &nbsp;
                        <Link className="no-underline border-b " href="#">
                            Terms of Service
                        </Link> and &nbsp;
                        <Link className="no-underline border-b " href="#">
                            Privacy Policy
                        </Link>
                    </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account? &nbsp;
                    
                    <Link className="no-underline border-b border-blue text-blue" href="../signup/">
                    Sign up
                    </Link>.

                    {users && <p>{JSON.stringify(users)}</p>}

                </div>
                </form>
        </Modal>
    </>
    )
  }
  
  export default Login;
