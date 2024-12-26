import React, { useEffect, useState } from 'react';

export default function DomainForm({ onAddDomain, tableData }) {
    const [Details, setDetails] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        description: "",
        sDate: "",
        eDate: ""
    });

    const [addingNew, setAddingNew] = useState({
        name: false,
        phone: false,
        email: false,
    });

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));

        // Auto-fill phone and email when name is selected
        if (name === "name" && value !== "Add New") {
            const selectedEntry = tableData.find(entry => entry.name === value);
            if (selectedEntry) {
                setDetails(prevDetails => ({
                    ...prevDetails,
                    phone: selectedEntry.phone,
                    email: selectedEntry.email
                }));
                setAddingNew({ name: false, phone: false, email: false });
            } else {
                setDetails(prevDetails => ({
                    ...prevDetails,
                    phone: "",
                    email: ""
                }));
            }
        }
    };

    const handleAddNew = (field) => {
        setAddingNew(prevState => ({
            ...prevState,
            [field]: true
        }));
        setDetails(prevDetails => ({
            ...prevDetails,
            [field]: ""
        }));
    };

    const clickButton = async () => {
        const { name, phone, email, service, description, sDate, eDate } = Details;
        if (!name || !phone || !email || !service || !description || !sDate || !eDate) {
            alert("All fields must be filled out.");
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Phone number must be exactly 10 digits and contain only numbers.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        console.log(Details);
        onAddDomain(Details);

        setDetails({
            name: '',
            phone: '',
            email: '',
            service: '',
            description: '',
            sDate: '',
            eDate: ''
        });
        setAddingNew({ name: false, phone: false, email: false });
    };

    return (
        <div>
            <h1>Subscription Details</h1>
            <div className="row">
                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Name</label>
                    {!addingNew.name ? (
                        <>
                            <select
                                className="form-control"
                                id="name"
                                value={Details.name}
                                name="name"
                                onChange={handleFieldChange}
                            >
                                <option value="">Select a name</option>
                                {tableData.map((entry) => (
                                    <option key={entry.id} value={entry.name}>
                                        {entry.name}
                                    </option>
                                ))}
                                <option value="Add New">Add New</option>
                            </select>
                            {Details.name === "Add New" && (
                                <button
                                    type="button"
                                    className="btn btn-link"
                                    onClick={() => handleAddNew("name")}
                                >
                                    Add New Name
                                </button>
                            )}
                        </>
                    ) : (
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={Details.name}
                            name="name"
                            onChange={handleFieldChange}
                            placeholder="Enter new name"
                        />
                    )}
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Phone</label>
                    {!addingNew.phone ? (
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={Details.phone}
                            name="phone"
                            onChange={handleFieldChange}
                            placeholder="Auto-filled or enter manually"
                        />
                    ) : (
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={Details.phone}
                            name="phone"
                            onChange={handleFieldChange}
                            placeholder="Enter new phone number"
                        />
                    )}
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Email</label>
                    {!addingNew.email ? (
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={Details.email}
                            name="email"
                            onChange={handleFieldChange}
                            placeholder="Auto-filled or enter manually"
                        />
                    ) : (
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={Details.email}
                            name="email"
                            onChange={handleFieldChange}
                            placeholder="Enter new email"
                        />
                    )}
                </div>

                {/* Remaining Fields */}
                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Service Name</label>
                    <select
                        className="form-control"
                        id="service"
                        value={Details.service}
                        name="service"
                        onChange={handleFieldChange}
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
                    <input type="text" className="form-control" id="description" value={Details.description} name='description' onChange={handleFieldChange} />
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Claimed Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="sDate"
                        value={Details.sDate}
                        name="sDate"
                        onChange={handleFieldChange}
                    />
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label">Expiry Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="eDate"
                        value={Details.eDate}
                        name="eDate"
                        onChange={handleFieldChange}
                    />
                </div>

                <div className="mb-3 col-md-12 col-12">
                    <button type="button" className="btn btn-primary" onClick={clickButton}>
                        Add Entry
                    </button>
                </div>
            </div>
        </div>
    );
}
