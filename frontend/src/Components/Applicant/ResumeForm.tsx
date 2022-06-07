import React from "react";
import './ResumeForm.css';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import ResumeTextField from "./ResumeTextField";

function ResumeForm() {


    const validate = Yup.object({
        resumeText: Yup.string()
            .min(20, 'Минимум 20 символов')
            .required('Необходимо заполнить резюме'),
    })

    async function addResume(resumeText:string) {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "create_resume",
            params: {
                content: resumeText
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/create_resume', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(res => {
            console.log(res);
        })

    }

    return(
        <div className="general_background">
        <div className={"resume_form"}>
            <div className="container mt-3">
                <div >
                    <Formik
                        initialValues={{
                            resumeText: '',
                        }}
                        validationSchema={validate}
                        onSubmit={values => {
                            console.log(values);
                            addResume(values.resumeText);
                        }}
                    >
                        {() => (
                            <div>
                                <h1 className="font-weight-bold title">Создание резюме</h1>
                                <Form>
                                    <ResumeTextField label="Текст резюме" name="resumeText" type="text" />
                                    <div className={"buttons"}>
                                        <button className="btn btn-success mt-3" type="submit">Создать</button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ResumeForm