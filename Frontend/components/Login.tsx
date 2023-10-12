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
      const [username, setUsername] = useState('');
       const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const loginUser = async (e) => {
        e.preventDefault();
    
        console.log('Username:', username);
        console.log('Password:', password);
    
        // Simple validation checks
        if (!username || !password) {
          setError("All fields are required.");
          return;
        }
    
        try {
          const result = await ApiUsers.post("/users/login", { username, password });
          const token = result.data.token;
    
          console.log(token)
          // Store token in sessionStorage
          sessionStorage.setItem('token', token);

          console.log('token:', token)

          // Clear any previous errors
          setError('');
          
          // Redirect or perform any actions after successful login
          // ...
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            setError("Invalid credentials. Please check your email and password.");
          } else {
            console.error('Error logging in:', error);
            setError("An error occurred while logging in.");
          }
        }
      }

      
    //   const loginUser = async (e) => {

    //     e.preventDefault(); // Prevent the default form submission behavior
        
    //     const email = emailOrUsernameRef.current.value;
    //     const password = passwordref.current.value;
        
    //     // Simple validation checks
    //     if (!email || !password) {
    //      setUsers({ error: "All fields are required." });
    //   return;
    //     }
      
    //     // Logging to verify input
    //     console.log('Username:', email);
    //     console.log('Password:', password);
      
    //     try {
    //       const response = await axios.post("http://localhost:5000/users/login", {
    //         username: email,
    //         password: password
    //       });
      
    //       if (response.data.accessToken === undefined) {
    //         localStorage.setItem('accessToken', 'null');
    //         localStorage.setItem('username', JSON.stringify('Guest'));
    //       } else {
    //         localStorage.setItem('accessToken', response.data.accessToken);
    //         localStorage.setItem('username', JSON.stringify(email));
            
    //       }
      
    //       console.log("response is " + JSON.stringify(response.data));
    //       setUsers({ error: "sucessssssssss" });
    //     } catch (error) {
    //       console.error('Error logging in:', error);
    //       setUsers({ error: "An error occurred while logging in." });
    // }
      
    //     console.log('localstorage auth is ' + localStorage.getItem('accessToken'));
    //     // window.location.reload(false);
    //   };
      
      
    return (
    <>
        <Modal 
        title="Login" 
        description="" 
        isOpen={isOpen} 
        onChange={onChange} 
        > <form onSubmit={loginUser}>
                    <input
                    value={username} 
                        onChange={(e) => setUsername(e.target.value)}                         type="text"
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

                    {users && <p>{JSON.stringify(users)}</p>}

                </div>
                </form>
        </Modal>
    </>
    )
  }
  
  export default Login;
