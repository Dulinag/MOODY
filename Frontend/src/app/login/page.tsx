
import React, {useState} from 'react'
import Login from '@/components/Login'
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'





const LoginPage = () => {
    return (
<>
<div className=" 
        h-fit
        bg-gradient-to-b
        from-purple-400/50
        p-6
 ">      
        
        <Login darkMode={false}/>
</div>
      </>
    )

  }
  
  export default LoginPage