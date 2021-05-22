import React from 'react';

const Field = ({ name, label, value, onChange, placeholder = "", type = "text", error = "" }) => ( 
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input 
            value={value} 
            onChange={onChange} 
            type={type}
            placeholder={placeholder || label}
            id={name}
            name={name}
            className={"form-control" + (error && " is-invalid")}
        />
        <div className="border-field"></div>
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
);
 
export default Field;