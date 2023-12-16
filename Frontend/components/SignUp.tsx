"use client";

import React, { useState, useRef } from 'react';
import useModal from '@/hooks/modalStore'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import Modal from './Modal'
import ApiUsers from '../Api/UsersApi'

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
      const usernameref = useRef<any>(null)
      const passwordref = useRef<any>(null)
      const emailref = useRef<any>(null)


      const [users, setUsers] = useState();
      const [feedback, setFeedback] = useState("");

      const createUsers = async (e) => {
        e.preventDefault();
      
        const username = usernameref.current.value;
        const password = passwordref.current.value;
        const email = emailref.current.value;
      
        // Simple validation checks
        if (!username || !password || !email) {
          setFeedback("All fields are required." );
          return;
        }
      
        // Additional validation logic (e.g., password length, email format, etc.) can be added here
      

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       if (!emailPattern.test(email)) {
           setFeedback("Invalid email format.");
          return;

        
  }

  
        try {
          const result = await ApiUsers.post("/users", { username, password, email });
          setFeedback(result.data);
      
          // Reset form values
          usernameref.current.value = "";
          passwordref.current.value = "";
          emailref.current.value = "";

          router.push('/profile');

        } catch (error) {
          console.error('Error creating user:', error);
          setFeedback("An error occurred while creating the user.");
        }

      }
      
      
      


      const fetchUsers = async () => {

        const result = await ApiUsers.get("/users")
        setUsers(result.data)
      }

    return (
    <>
         <Modal 
            title="Sign Up" 
            description="" 
            isOpen={isOpen} 
            onChange={onChange} 
            >           
            <form className="px-6 py-8 rounded shadow-md text-white w-full"      
            onSubmit={createUsers}>
                        <input 
                            ref = {usernameref}
                            type="text"
                            className="text-white block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Username" />
                        <input 
                            ref = {emailref}
                            type="text"
                            className=" text-white block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />
                        <input
                            ref = {passwordref}
                            type="password"
                            className=" text-white block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />
                        {/* <input 
                            type="password"
                            className="text-white block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password" /> */}
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

                        {feedback && <p>{JSON.stringify(feedback)}</p>}
                    </div>
            </form>
        </Modal >

    </>
    )
  }
  
  export default SignUp;