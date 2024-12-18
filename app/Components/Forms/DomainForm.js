import axios from 'axios';
import React, { useState } from 'react'

export default function DomainForm({ onAddDomain }) {

    const [Details, setDetails] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        description:"",
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

    const clickButton =  async () => {

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

            <h1>Enter Domain holder details</h1>

            <div className="row">

                <div class="mb-3 col-md-6 col-12">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" value={Details.name} name='name' onChange={changed} />
                </div>

                <div class="mb-3  col-md-6 col-12">
                    <label class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="phone" value={Details.phone} name='phone' onChange={changed} />
                </div>

                <div class="mb-3  col-md-6 col-12">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" value={Details.email} name='email' onChange={changed} />
                </div>

                {/* <div class="mb-3 col-md-6 col-12">
                    <label class="form-label">Service Name</label>
                    <input type="text" class="form-control" id="service" value={Details.service} name='service' onChange={changed} />
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
                    <label class="form-label">Service descriptionription</label>
                    <input type="text" class="form-control" id="description" value={Details.description} name='description' onChange={changed} />
                </div>



                <div class="mb-3 col-md-6 col-12">
                    <label class="form-label">Claimed Date</label>
                    <input type="date" class="form-control" id="sDate" value={Details.sDate} name='sDate' onChange={changed} />
                </div>

                <div class="mb-3 col-md-6 col-12">
                    <label class="form-label">Expiry Date</label>
                    <input type="date" class="form-control" id="eDate" value={Details.eDate} name='eDate' onChange={changed} />
                </div>

                <div className="mb-3 col-md-12 col-12">
                    <button type="button" class="btn btn-primary" onClick={clickButton}>Add Entry</button>
                </div>
            </div>

        </div>
    )
}
