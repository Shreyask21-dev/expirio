'use client'
import React from 'react'
import LoginForm from '../Components/Forms/LoginForm'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function page() {

    const router = useRouter()  

    const onsubmited = async (object) => {
        const response = await axios.post('http://localhost:3000/api/Login', object)

        console.log(response.data)

        if(response.data.message ==="Login successful"){
            localStorage.setItem('userName', response.data.email)
            router.push('/')
        }

    }

  return (
    <div>
        <LoginForm submit={onsubmited} />
    </div>
  )
}
