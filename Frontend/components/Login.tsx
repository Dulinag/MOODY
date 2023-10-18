"use client";

import React, {useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import useModal from '@/hooks/modalStore'
import Modal from './Modal'
import ApiUsers from "../Api/UsersApi"
import axios from 'axios';

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
      const [emailOrUsername, SetEmailOrUsername] = useState('');
       const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const loginUser = async (e) => {
        e.preventDefault();
    
        console.log('UsernameorEmail:', emailOrUsername);
        console.log('Password:', password);
    
        // Simple validation checks
        if (!emailOrUsername || !password) {
          setError("All fields are required.");
          return;
        }
        console.log('Before API call');
        try {
          const result = await ApiUsers.post("/users/login", { emailOrUsername, password });
          console.log('Result:', result);
          const token = result.data.token;
    
          console.log(token)
          // Store token in sessionStorage
          sessionStorage.setItem('token', token);

          console.log('token:', token)

          // Clear any previous errors
          setError('');
          
          // Redirect or perform any actions after successful login

        setPassword('');
        SetEmailOrUsername('');
        router.push('/profile');
          // ...
        } catch (error: any) {
          console.error('Error:', error);
          if (error.response && error.response.status === 401) {
            setError("Invalid credentials. Please check your email and password.");
          } else {
            console.error('Error logging in:', error);
            setError("An error occurred while logging in.");
          }
        }

        
        console.log('After API call');
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
                    value={emailOrUsername} 
                        onChange={(e) => SetEmailOrUsername(e.target.value)}                         type="text"
                        className=" text-white block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email or Username" />
                        
                    <input 
                        type="password"

                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
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

                    {error && <div className="error-message">{error}</div>}
                </div>

                </form>
        </Modal>
    </>
    )
  }
  
  export default Login;