import React from 'react';
import { Formik, Form } from 'formik';
import TextField from './TextField';
import {register} from "../HomePage/requests";
import './RegForm.css'
import * as Yup from 'yup';

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
        password: Yup.string()
            .min(6, 'Пароль должен состоять минимум из 6 символов')
            .required('Необходимо заполнить'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
            .required('Необходимо подтвердить пароль'),
    })
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                patronymic: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={validate}
            onSubmit={values => {
                console.log(values);
                register(values.email,values.password,values.confirmPassword,
                        values.firstName,values.lastName,values.patronymic)
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