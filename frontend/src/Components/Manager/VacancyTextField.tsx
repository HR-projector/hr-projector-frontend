import React from 'react';
import { ErrorMessage, useField } from 'formik';

function VacancyTextField({ label, ...props}:any){
    const [field, meta] = useField(props);
    return (
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>
            {(props.content === 'textarea') &&
            <textarea
                className={`form-control shadow-none textarea-style ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
            >
            </textarea>
            }
            {(props.content === 'input') &&
            <input
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
            />
            }
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
}

export default VacancyTextField;