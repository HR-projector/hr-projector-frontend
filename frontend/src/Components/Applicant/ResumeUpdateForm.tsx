import React from "react";
import './ResumeForm.css';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import ResumeTextField from "./ResumeTextField";
import TextField from "../Registration/TextField";
import {useSearchParams} from "react-router-dom";


function ResumeUpdateForm() {

    const [searchParams, setSearchParams] = useSearchParams();

    // const validate = Yup.object({
    //     resumeText: Yup.string()
    //         .min(20, 'Минимум 20 символов')
    //         .required('Необходимо заполнить резюме'),
    // })

    async function updateResume(id:number ,current_position:string, desired_position:string,
                                skills:string[], experience:number, bio:string) {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "update_resume",
            params: {
                id: id,
                content: {
                    current_position: current_position,
                    desired_position: desired_position,
                    skills: skills,
                    experience: experience,
                    bio: bio
                }
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/update_resume', {
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
                            current_position: searchParams.get("current_position")!,
                            desired_position: searchParams.get("desired_position")!,
                            skills: searchParams.get("skills")!,
                            experience: Number(searchParams.get("experience")!),
                            bio: searchParams.get("bio")!
                        }}
                        // validationSchema={validate}
                        onSubmit={values => {
                            console.log(values);
                            updateResume(values.id, values.current_position, values.desired_position,
                                values.skills.split(','), values.experience, values.bio);
                        }}
                    >
                        {() => (
                            <div>
                                <h1 className="font-weight-bold title">Редактирование резюме</h1>
                                <Form>
                                    <TextField label="Текущая позиция" name="current_position" type="text" />
                                    <TextField label="Желаемая позиция" name="desired_position" type="text" />
                                    <TextField label="Рабочие навыки" name="skills" type="array" />
                                    <TextField label="Опыт (в годах)" name="experience" type="number" />
                                    <ResumeTextField label="Биография" name="bio" type="text" />
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

export default ResumeUpdateForm ;