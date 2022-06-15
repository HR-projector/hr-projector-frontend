import React from "react";
import '../Applicant/ResumeForm.css'
import {Form, Formik} from "formik";
import * as Yup from "yup";
import VacancyTextField from "./VacancyTextField";
import {useSearchParams} from "react-router-dom";

function VacancyUpdateForm() {

    const [searchParams, setSearchParams] = useSearchParams();

    const validate = Yup.object({
        position: Yup.string()
            .required('Необходимо заполнить поле'),
        experience: Yup.string()
            .required('Необходимо заполнить поле'),
        description: Yup.string()
            .min(20, 'Минимум 20 символов')
            .required('Необходимо заполнить резюме'),
    })

    async function updateVacancy(id:number, position:string,experience:number,description:string) {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "update_vacancy",
            params: {
                id: id,
                new_data: {
                    position: position,
                    experience: experience,
                    description: description
                }
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/update_vacancy', {
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
                                id: Number(searchParams.get('id')!),
                                position: searchParams.get("position")!,
                                experience: Number(searchParams.get("experience")!),
                                description: searchParams.get("description")!
                            }}
                            validationSchema={validate}
                            onSubmit={values => {
                                console.log(values);
                                updateVacancy(values.id,values.position,Number(values.experience),values.description);
                            }}
                        >
                            {() => (
                                <div>
                                    <h1 className="font-weight-bold title">Редактирование Вакансии</h1>
                                    <Form>
                                        <VacancyTextField label="На какую позицию необходим работник" name="position" type="text" content='input'/>
                                        <VacancyTextField label="Опыт разработки" name="experience" type="text" content='input'/>
                                        <VacancyTextField label="Текст вакансии" name="description" type="text" content='textarea'/>
                                        <div className={"buttons"}>
                                            <button className="btn btn-success mt-3" type="submit">Обновить</button>
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

export default VacancyUpdateForm