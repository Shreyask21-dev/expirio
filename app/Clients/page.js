'use client'
import React,{useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import Client from '../Components/Client'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
    useEffect(() => {
      const user = localStorage.getItem('userName');
  
      if (!user) {
        // If userName is not found, redirect immediately
        router.push('/Login/');
      } else {
        setIsCheckingAuth(false); // Authentication check completed
      }
    }, [router]);
  
    if (isCheckingAuth) {
      // While checking authentication, prevent rendering the page
      return <div>Redirecting...</div>;
    }
  
  
  
  return (
    <div style={{backgroundColor:"#ffffff"}}>
    
      <Navbar />
    
      <div className='container mt-4'>
    
        <div className='row'>

          <Client />
        
        </div>

      </div>
    
    </div>
  )
}
