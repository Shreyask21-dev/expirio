import React, { useState } from 'react'

export default function EditPopUpClients({ currentRecord, onClose, onUpdate }) {

    const [formData, setFormData] = useState(currentRecord || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        console.log(formData)
    };

    return (
        <>
            <div className="popup" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#00000099", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
                <div className="popup-content" style={{ background: "white", padding: "20px", borderRadius: "5px", width: "400px" }}>
                    <h3>Edit Record</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={formData.name || ''} onChange={handleChange} />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Company</label>
                            <input type="text" className="form-control" name="company" value={formData.company || ''} onChange={handleChange} />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" className="form-control" name="phone" value={formData.phone || ''} onChange={handleChange} />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={formData.email || ''} onChange={handleChange} />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Service descriptionription</label>
                            <input type="text" className="form-control" id="description" value={formData.description} name='description' onChange={handleChange} />
                        </div>


                        {/* Add other fields as needed */}
                        <div className='d-flex justify-content-around' style={{ width: "60%" }}>

                            <button type="submit" className='btn btn-outline-primary'>Save Changes</button>
                            <button type="button" onClick={onClose} className='btn btn-outline-primary'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
