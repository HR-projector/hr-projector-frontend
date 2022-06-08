import React from 'react';
import { Formik, Form} from 'formik';
import TextField from './TextField';
import DepartmentOption from "./DepartmentOption";
import './RegForm.css'
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";

function RegForm() {
    const validate = Yup.object({
        firstName: Yup.string()
            .max(15, 'Максимум 15 символов')
            .required('Необходимо заполнить'),
        lastName: Yup.string()
            .max(20, 'Максимум 20 символов')
            .required('Необходимо заполнить'),
        patronymic: Yup.string()
            .max(20, 'Максимум 30 символов')
            .required('Необходимо заполнить'),
        email: Yup.string()
            .email('Почты не сущетсвует')
            .required('Необходимо заполнить почту'),
        departmentOption: Yup.string()
            .required('Необходимо выбрать департамент'),
        password: Yup.string()
            .min(6, 'Пароль должен состоять минимум из 6 символов')
            .required('Необходимо заполнить'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
            .required('Необходимо подтвердить пароль'),
    })

    const navigate = useNavigate();

    function RouteToLogin() {
        navigate("/");
    }

    async function register(email:string,password:string,password_confirmation:string,
                            first_name:string,last_name:string,patronymic:string,departmentOption:string) {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "register",
            params: {
                user_data: {
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                    first_name: first_name,
                    last_name: last_name,
                    patronymic: patronymic,
                    department_id: departmentOption
                }
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/register', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        response.json().then(res => {
            if (res.hasOwnProperty("error")) {
                if (res.error.code === 1001) {
                    alert(`Ошибка ${res.error.code}, Пользователь уже сущетсвует`)
                }
                else if (res.error.code === 2001) {
                    alert(`Ошибка ${res.error.code}, Департамент не найден`)
                }
            }
            else {
                RouteToLogin()
            }
        })
    }

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                patronymic: '',
                email: '',
                password: '',
                confirmPassword: '',
                departmentOption : ''
            }}
            validationSchema={validate}
            onSubmit={values => {
                console.log(values);
                register(values.email,values.password,values.confirmPassword,
                        values.firstName,values.lastName,values.patronymic,values.departmentOption)
            }}
        >
            {() => (
                <div>
                    <h1 className="my-4 font-weight-bold .display-4 title">Регистрация</h1>
                    <Form>
                        <TextField label="Имя" name="firstName" type="text" />
                        <TextField label="Фамилия" name="lastName" type="text" />
                        <TextField label="Отчество" name="patronymic" type="text" />
                        <TextField label="Почта" name="email" type="email" />
                        <TextField label="Пароль" name="password" type="password" />
                        <TextField label="Подтверждение пароля" name="confirmPassword" type="password" />
                        <DepartmentOption label="Выбор департамента" name="departmentOption" />
                        <div className={"buttons"}>
                            <button className="btn btn-success mt-3 submit" type="submit">Подтвердить</button>
                            <button className="btn btn-danger mt-3 ml-3 reset" type="reset">Сбросить</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export default RegForm;