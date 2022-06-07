import React, {useCallback, useEffect} from "react";
import './ResumeForm.css';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import ResumeTextField from "./ResumeTextField";
import TextField from "../Registration/TextField";
import SelectField from "../General/SelectField";

function ResumeForm() {

    // const validate = Yup.object({
    //     current_position: Yup.string()
    //         .min(20, 'Минимум 20 символов')
    //         .required('Необходимо указать вашу текущую позицию'),
    //     desired_position: Yup.string()
    //         .min(20, 'Минимум 20 символов')
    //         .required('Необходимо указать вашу желаемую позицию'),
    //     // skills: Yup.array()
    //     //     .required('Необходимо указать ваши навыки'),
    //     experience: Yup.number()
    //         .required('Необходимо указать ваш стаж'),
    //     bio: Yup.string()
    //         .min(20, 'Минимум 20 символов')
    //         .required('Необходимо указать вашу биографию'),
    // })

    async function addResume(current_position:string, desired_position:string,
                             skills:string[], experience:number, bio:string)
    {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "create_resume",
            params: {
                content: {
                    current_position: current_position,
                    desired_position: desired_position,
                    skills: skills,
                    experience: experience,
                    bio: bio
                }
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
                            current_position: "",
                            desired_position: "",
                            skills: [
                                "бекенд","фронтенд","аналитик"
                            ],
                            experience: 0,
                            bio: ""
                        }}
                        // validationSchema={validate}
                        onSubmit={values => {
                            console.log(values);
                            addResume(values.current_position, values.desired_position,
                                values.skills, values.experience, values.bio);
                        }}
                    >
                        {() => (
                            <div>
                                <h1 className="font-weight-bold title">Создание резюме</h1>
                                <Form>
                                    <TextField label="Текущая позиция" name="current_position" type="text" />
                                    <TextField label="Желаемая позиция" name="resumeText" type="text" />
                                    <TextField label="Рабочие навыки" name="skills" type="array" />
                                    <TextField label="Опыт (в годах)" name="experience" type="number" />
                                    <ResumeTextField label="Биография" name="bio" type="text" />
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