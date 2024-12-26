'use client';
import React, { useState } from 'react';
import LoginForm from '../Components/Forms/LoginForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function page() {

    const router = useRouter()  

    const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

    // const onsubmited = async (object) => {
    //     const response = await axios.post('https://expirio.vercel.app/api/Login', object)

    //     console.log(response.data)

    //     if(response.data.message ==="Login successful"){
    //         localStorage.setItem('userName', response.data.email)
    //         router.push('/')
    //     }

    // }

    const onsubmited = async (object) => {
      try {
        const response = await axios.post('https://expirio.vercel.app/api/Login', object);
  
        if (response.data.message === 'Login successful') {
          localStorage.setItem('userName', response.data.email);
          router.push('/');
        }
      } catch (error) {
        // Extract error message from the response
        const errorMsg =
          error.response?.data?.error || 'Something went wrong. Please try again.';
        setErrorMessage(errorMsg); // Set the error message in state
      }
    };
  

  return (
    <div style={{backgroundColor:"#ffffff"}}>
        {errorMessage && ( // Conditionally render the alert box if there's an error message
        <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
          {errorMessage}
        </div>
      )}
        <LoginForm submit={onsubmited} />
    </div>
  )
}
