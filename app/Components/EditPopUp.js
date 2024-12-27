import React, { useState, useEffect } from 'react';

export default function EditPopUp({ currentRecord, onClose, onUpdate }) {
    const formatToISODate = (date) => {
        if (!date) return ''; // Handle null or undefined
        const [day, month, year] = date.split('-'); // Parse dd-MM-yyyy format
        return `${year}-${month}-${day}`; // Convert to ISO 8601 format
    };

    const [formData, setFormData] = useState(() => ({
        ...currentRecord,
        renewal_amt: currentRecord?.renewal_amt || '',
        sDate: currentRecord?.sDate ? formatToISODate(currentRecord.sDate) : '',
        eDate: currentRecord?.eDate ? formatToISODate(currentRecord.eDate) : '',
    }));

    // useEffect(() => {
    //     if (currentRecord) {
    //         setFormData({
    //             ...currentRecord,
    //             sDate: currentRecord.sDate ? formatToISODate(currentRecord.sDate) : '',
    //             eDate: currentRecord.eDate ? formatToISODate(currentRecord.eDate) : '',
    //         });
    //     }
    // }, [currentRecord]);

    useEffect(() => {
        if (currentRecord) {
            setFormData({
                ...currentRecord,
                renewal_amt: currentRecord.renewal_amt || '', // Add renewal_amt
                sDate: currentRecord.sDate ? formatToISODate(currentRecord.sDate) : '',
                eDate: currentRecord.eDate ? formatToISODate(currentRecord.eDate) : '',
            });
        }
    }, [currentRecord]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        console.log(formData);
    };

    return (
        <div
            className="popup"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#00000099',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <style>
                {`
                    @media only screen and (max-width: 600px) {
                        .popup-content {
                            width:75% !important;
                        }
                    }
                `}
            </style>
            <div
                className="popup-content"
                style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    width: '50%',
                }}
            >
                <h3 className='text-center'>Edit Record</h3>
                <form onSubmit={handleSubmit} className='row'>
                    <div className="form-group mb-2 col-md-6 col-12">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-2  col-md-6 col-12">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-2  col-md-6 col-12">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-2  col-md-6 col-12">
                        <label className="form-label">Service Name</label>
                        <select
                            className="form-control"
                            id="service"
                            value={formData.service || ''}
                            name="service"
                            onChange={handleChange}
                        >
                            <option value="">Select a service</option>
                            <option value="Domain">Domain</option>
                            <option value="Domain + Hosting SSL">
                                Domain + Hosting SSL
                            </option>
                            <option value="Hosting SSL">Hosting SSL</option>
                            <option value="AMC">AMC</option>
                            <option value="Business Email">Email</option>
                        </select>
                    </div>

                    <div className="form-group mb-2  col-md-6 col-12">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group mb-2 col-md-6 col-12">
                        <label className="form-label">Renewal Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            name="renewal_amt"
                            value={formData.renewal_amt || ''}
                            onChange={handleChange}
                            placeholder="Enter renewal amount"
                        />
                    </div>

                    <div className="form-group mb-2 col-md-6 col-12">
                        <label className="form-label">Claimed Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="sDate"
                            value={formData.sDate || ''}
                            name="sDate"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-2 col-md-6 col-12">
                        <label className="form-label">Expiry Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="eDate"
                            value={formData.eDate || ''}
                            name="eDate"
                            onChange={handleChange}
                        />
                    </div>
                    <div
                        className="d-flex justify-content-center m-4"
                    >
                        <div>

                        <button type="submit" className="btn btn-outline-primary mx-2">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-outline-primary mx-2"
                        >
                            Cancel
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
