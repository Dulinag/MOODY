"use client";


import React, {useState} from 'react'
import SignUp from "./SignUp"

interface SignUpProps {
  darkMode: boolean;
}
const Login: React.FC<SignUpProps> = ({ darkMode }) => {

    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignUpClick = () => {
        setShowSignUp(true);
      }

    return (
<>


<div className="flex justify-center items-center min-h-screen"><div className={`bg-${darkMode ? 'black' : 'grey'}-lighter min-h-screen flex flex-col`}>            
<div className="container relative max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 :hover {}">                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                   
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
                  
                    <button
                        type="submit"
                        className=" bg-indigo-500 w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                    >Login</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By Logining in, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account? 
                    
                    <a className="no-underline border-b border-blue text-blue" href="../signup/">
                    Sign up
                    </a>.
                </div>
            </div>
        </div>

        {showSignUp && <SignUp darkMode={false} />} {/* Render the SignUp component if showSignUp is true */}


</div>



</>
    )
  }
  
  export default Login;