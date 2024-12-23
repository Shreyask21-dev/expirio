import React from 'react'
import Navbar from '../Components/Navbar'
import Client from '../Components/Client'

export default function page() {
  return (
    <div>
    
      <Navbar />
    
      <div className='container mt-4'>
    
        <div className='row'>

          <Client />
        
        </div>

      </div>
    
    </div>
  )
}
