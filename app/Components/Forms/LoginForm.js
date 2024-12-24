'use client'
import React, {useState} from 'react'

export default function LoginForm({submit}) {

    const [Details, setDetails] = useState({
            email: "",
            password:""
        })

        const changed = (e) => {
            const { name, value } = e.target; // Destructure name and value from the event target
            setDetails(prevDetails => ({
                ...prevDetails,
                [name]: value // Update the specific field based on the input's name
            }));
        }

        const submited = () =>{
            submit(Details)
        }

    return (
        <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div className='shadow p-3 mb-5 bg-body-tertiary rounded'>
                <h3 className='text-center'>Login Form</h3>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' onChange={changed} value={Details.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name='password' onChange={changed} value={Details.password} className="form-control" id="exampleInputPassword1" />
            </div>

            <button className="btn btn-primary" onClick={submited}>Submit</button>
            </div>


        </div>
    )
}
