import React from 'react';
import { ErrorMessage, useField } from 'formik';

function SelectField({ label, ...props}:any){
    const [field, meta] = useField(props);
    return (
        <div className="mb-2">
        <label htmlFor={field.name}>{label}</label>
            <select multiple name="vacancy[]">
                <option value="Ебейщий бекендер">бекендер</option>
                <option value="Ебейщий фронтовик">фронтовик</option>
                <option value="Ебейщий анал">анал</option>
            </select>
    <ErrorMessage component="div" name={field.name} className="error" />
        </div>
)
}

export default SelectField;