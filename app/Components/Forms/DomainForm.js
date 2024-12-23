import axios from 'axios';
import React, { useState } from 'react'

export default function DomainForm({ onAddDomain }) {

    const [Details, setDetails] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        description: "",
        sDate: "",
        eDate: ""
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

        onAddDomain(Details)

        // Clear the form after submission (optional)
        setDetails({
            name: '',
            phone: '',
            email: '',
            service: '',
            description: '',
            sDate: '',
            eDate: '',
        });


    }

    return (
        <div>

            <h1>Subscription details</h1>

            <div className="row">

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={Details.name} name='name' onChange={changed} />
                </div>

                <div className="mb-3  col-md-6 col-12">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" value={Details.phone} name='phone' onChange={changed} />
                </div>

                <div className="mb-3  col-md-6 col-12">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={Details.email} name='email' onChange={changed} />
                </div>

                {/* <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Service Name</label>
                    <input type="text" className="form-control" id="service" value={Details.service} name='service' onChange={changed} />
                </div> */}

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Service Name</label>
                    <select
                        className="form-control"
                        id="service"
                        value={Details.service}
                        name="service"
                        onChange={changed}
                    >
                        <option value="">Select a service</option>
                        <option value="Domain">Domain</option>
                        <option value="Domain + Hosting SSL">Domain + Hosting SSL</option>
                        <option value="Hosting SSL">Hosting SSL</option>
                        <option value="AMC">AMC</option>
                        <option value="Business">Email</option>
                    </select>
                </div>

                <div className="mb-3 col-md-12 col-12">
                    <label className="form-label">Service descriptionription</label>
                    <input type="text" className="form-control" id="description" value={Details.description} name='description' onChange={changed} />
                </div>



                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Claimed Date</label>
                    <input type="date" className="form-control" id="sDate" value={Details.sDate} name='sDate' onChange={changed} />
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Expiry Date</label>
                    <input type="date" className="form-control" id="eDate" value={Details.eDate} name='eDate' onChange={changed} />
                </div>

                <div className="mb-3 col-md-12 col-12">
                    <button type="button" className="btn btn-primary" onClick={clickButton}>Add Entry</button>
                </div>
            </div>

        </div>
    )
}
