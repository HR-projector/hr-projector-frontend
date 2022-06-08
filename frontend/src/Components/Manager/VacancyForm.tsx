import React from "react";
import '../Applicant/ResumeForm.css';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import VacancyTextField from "./VacancyTextField";

function VacancyForm() {


    const validate = Yup.object({
        position: Yup.string()
            .required('Необходимо заполнить поле'),
        experience: Yup.string()
            .required('Необходимо заполнить поле'),
        description: Yup.string()
            .min(20, 'Минимум 20 символов')
            .required('Необходимо заполнить резюме'),
    })

    async function addVacancy(position:string,experience:number,description:string) {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "create_vacancy",
            params: {
                vacancy_data: {
                    position: position,
                    experience: experience,
                    description: description
                }
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/create_vacancy', {
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
                    <div>
                        <Formik
                            initialValues={{
                                position: '',
                                experience: 0,
                                description: '',
                            }}
                            validationSchema={validate}
                            onSubmit={values => {
                                addVacancy(values.position,Number(values.experience),values.description);
                                console.log(values);
                            }}
                        >
                            {() => (
                                <div>
                                    <h1 className="font-weight-bold title">Создание Вакансии</h1>
                                    <Form>
                                        <VacancyTextField label="На какую позицию необходим работник" name="position" type="text" content='input'/>
                                        <VacancyTextField label="Опыт разработки" name="experience" type="text" content='input'/>
                                        <VacancyTextField label="Текст вакансии" name="description" type="text" content='textarea'/>
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

export default VacancyForm