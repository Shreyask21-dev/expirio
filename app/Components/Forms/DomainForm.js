import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DomainForm({ onAddDomain, tableData }) {

    const router = useRouter()

    const [Details, setDetails] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        description: "",
        renewal_amt: "",
        sDate: "",
        eDate: ""
    });

    const [addingNew, setAddingNew] = useState({
        name: false,
        phone: false,
        email: false,
    });

    // Helper to get unique entries
    const getUniqueEntries = (data) => {
        const seen = new Set();
        return data.filter((entry) => {
            const key = `${entry.name}-${entry.phone}-${entry.email}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    };

    const uniqueEntries = getUniqueEntries(tableData);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        // Auto-fill phone and email when name is selected
        if (name === "name" && value !== "Add New") {
            const selectedEntry = tableData.find((entry) => entry.name === value);
            if (selectedEntry) {
                setDetails((prevDetails) => ({
                    ...prevDetails,
                    phone: selectedEntry.phone,
                    email: selectedEntry.email,
                }));
                setAddingNew({ name: false, phone: false, email: false });
            } else {
                setDetails((prevDetails) => ({
                    ...prevDetails,
                    phone: "",
                    email: "",
                }));
            }
        }
    };

    const handleAddNew = (field) => {
        setAddingNew((prevState) => ({
            ...prevState,
            [field]: true,
        }));
        setDetails((prevDetails) => ({
            ...prevDetails,
            [field]: "",
        }));
    };

    // const clickButton = async () => {
    //     const { name, phone, email, service, description, sDate, eDate } = Details;
    //     if (!name || !phone || !email || !service || !description || !sDate || !eDate) {
    //         alert("All fields must be filled out.");
    //         return;
    //     }

    //     const phoneRegex = /^[0-9]{10,15}$/;
    //     if (!phoneRegex.test(phone)) {
    //         alert("Phone number must be exactly min 10 digits and max 15 digits and contain only numbers.");
    //         return;
    //     }

    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(email)) {
    //         alert("Please enter a valid email address.");
    //         return;
    //     }

    //     console.log(Details);
    //     onAddDomain(Details);

    //     setDetails({
    //         name: '',
    //         phone: '',
    //         email: '',
    //         service: '',
    //         description: '',
    //         sDate: '',
    //         eDate: ''
    //     });
    //     setAddingNew({ name: false, phone: false, email: false });
    // };

    const clickButton = async () => {
        const { name, phone, email, service, description, renewal_amt, sDate, eDate } = Details;
        if (!name || !phone || !email || !service || !description || !renewal_amt || !sDate || !eDate) {
            alert("All fields must be filled out.");
            return;
        }

        // Ensure `renewal_amt` is a valid number
        if (isNaN(renewal_amt) || Number(renewal_amt) <= 0) {
            alert("Renewal amount must be a positive number.");
            return;
        }

        onAddDomain(Details);

        // Reset the form
        setDetails({
            name: '',
            phone: '',
            email: '',
            service: '',
            description: '',
            renewal_amt: '',
            sDate: '',
            eDate: ''
        });
    };

    return (
        <div>
            <h1 className='text-dark'>Subscription Details</h1>
            <div className="row">
                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label text-dark">Name</label>
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
                                {uniqueEntries.map((entry) => (
                                    <option key={entry.id} value={entry.name}>
                                        {entry.name}
                                    </option>
                                ))}
                                <option value="Add New">Add New</option>
                            </select>
                            {Details.name === "Add New" && (
                                router.push('/Clients')
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
                    <label className="form-label text-dark">Phone</label>
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
                    <label className="form-label text-dark">Email</label>
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
                    <label className="form-label text-dark">Service Name</label>
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
                        <option value="Business Email">Email</option>
                    </select>
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label text-dark">Service Description</label>
                    <input type="text" className="form-control" id="description" value={Details.description} name='description' onChange={handleFieldChange} />
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label text-dark">Renewal Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="renewal_amt"
                        value={Details.renewal_amt}
                        name="renewal_amt"
                        onChange={handleFieldChange}
                        placeholder="Enter renewal amount"
                    />
                </div>

                <div className="mb-3 col-md-6 col-12">
                    <label className="form-label text-dark">Launch Date</label>
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
                    <label className="form-label text-dark">Expiry Date</label>
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
