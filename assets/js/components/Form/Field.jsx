import React from 'react';

const Field = ({ name, label, value, onChange, placeholder = "", type = "text", error = "" }) => ( 
    <div className="form-group">
        {error && <p className="invalid-feedback">{error}</p>}
        <input 
            value={value} 
            onChange={onChange} 
            type={type}
            placeholder={placeholder}
            id={name}
            name={name}
            className={"form-control" + (error && " is-invalid")}
            required
        />
        <label htmlFor={name}>{label}</label>

        <div className="border-field"></div>
    </div>
);
 
export default Field;