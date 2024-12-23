import React, { useState } from 'react'

export default function ClientForm({ onAdd }) {

    const [Details, setDetails] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        description: "",
    })

    const changed = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event target
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value // Update the specific field based on the input's name
        }));
    }

    const clickButton = async () => {

        console.log(Details)

        onAdd(Details)

        // Clear the form after submission (optional)
        setDetails({
            name: '',
            company: '',
            phone: '',
            email: '',
            description: '',
        });


    }

    return (
        <div>
            <h1>Client Addition Form</h1>
            <div className="row">

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={Details.name} onChange={changed}/>
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Company Name</label>
                    <input type="text" className="form-control" id="company" name='company' value={Details.company} onChange={changed}/>
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Phone</label>
                    <input type="tele" className="form-control" id="phone" name='phone' value={Details.phone} onChange={changed}/>
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' value={Details.email} onChange={changed}/>
                </div>

                <div className="mb-3 col-md-12 col-12">
                    <label className="form-label">Service description</label>
                    <input type="text" className="form-control" id="description" name='description' value={Details.description} onChange={changed}/>
                </div>

                <div className="mb-3 col-md-12 col-12">
                    <button type="button" className="btn btn-primary" onClick={clickButton}>Add Entry</button>
                </div>
            </div>
        </div>
    )
}
