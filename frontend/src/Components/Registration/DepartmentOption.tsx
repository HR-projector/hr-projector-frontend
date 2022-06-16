import { ErrorMessage, useField,Field} from 'formik';
import {useEffect, useState} from "react";

function DepartmentOption({ label, ...props}:any){

    useEffect(() => {
        getDepartments()
    }, []);

    const [field, meta] = useField(props);

    const [state, setState] = useState({
        departments: [{id:0,name:''}]
    });

    async function getDepartments() {

        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "get_departments",
            params: {}
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_departments', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        response.json().then(res => {
            if (res.hasOwnProperty("error")) {
                alert(`Ошибка ${res.error.code}`)
            }
            else {
                setState({departments: res.result})
            }
        })
    }

    return (
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>
            <Field class="form-select" name="departmentOption" as="select">
                <option value='0'>Выберите департамент</option>
                {state.departments.map(department => {
                    return (
                        <option value={department.id}>{department.name}</option>
                    )
                })}
            </Field>
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
}

export default DepartmentOption;