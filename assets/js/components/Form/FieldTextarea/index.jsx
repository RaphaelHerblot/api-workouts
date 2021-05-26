import React from 'react';

// Textarea field of a form

const FieldTextarea = ({ name, label, value, onChange, placeholder = "", error = "" }) => ( 
    <div className="form-group">
        {error && <p className="invalid-feedback">{error}</p>}
        <p className="label-textarea">{label}</p>
        <textarea 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            id={name}
            name={name}
            className={"form-control" + (error && " is-invalid")}
            required
        />
    </div>
);
 
export default FieldTextarea;