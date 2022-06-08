import React from 'react';
import { Formik, Form } from 'formik';
import TextField from '../Registration/TextField';
import '../Registration/RegForm.css'
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom"

function LoginForm() {
    const validate = Yup.object({
        email: Yup.string()
            .email('Почты не сущетсвует')
            .required('Необходимо заполнить почту'),
        password: Yup.string()
            .min(6, 'Пароль должен состоять минимум из 6 символов')
            .required('Необходимо заполнить')
    })

    const navigate = useNavigate();

    async function login(email:string,password:string) {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "login",
            params: {
                credentials: {
                    email: email,
                    password: password
                }
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/login', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        response.json().then(res => {
            if (res.hasOwnProperty("error")) {
                alert(`Ошибка ${res.error.code}, авторизация не произведена, проверьте логин и пароль`)
            }
            else {
                alert(`Авторизация пройдена`);
                console.log(res.result.token)
                localStorage.setItem("token",res.result.token)
            }
        }).then(() => {
            getCurrentUser();
        })

    }

    async function getCurrentUser() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "get_current_user",
            params: {}
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_current_user', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body),
        });
        response.json().then(res => {
            if (res.hasOwnProperty("error")) {
                alert(`Ошибка ${res.error.code}, ошибка получения пользователя`)
            }
            else {
                localStorage.setItem("user",JSON.stringify(res.result));
                navigate('/app/home')
            }
        })
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validate}
            onSubmit={values => {
                console.log(values);
                login(values.email,values.password);
            }}
        >
            {() => (
                <div>
                    <h1 className="my-4 font-weight-bold .display-4 title">Авторизация</h1>
                    <Form>
                        <TextField label="Почта" name="email" type="email" />
                        <TextField label="Пароль" name="password" type="password" />
                        <div className={"buttons"}>
                            <button className="btn btn-success mt-3 submit" type="submit">Войти</button>
                        </div>
                    </Form>
                    <a href={"/reg"}>
                        <button className="btn btn-danger mt-3 ml-3 reg">
                            Зарегистрироваться
                        </button>
                    </a>
                </div>
            )}
        </Formik>
    )
}

export default LoginForm;