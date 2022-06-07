import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import ResumeCard from "./Cards/Card";

function Resume() {
    const [state, setState] = useState({
        resumes:[{
            id: 0,
            state: "DRAFT",
            current_position: "string",
            desired_position: "string",
            skills: [
                "string"
            ],
            experience: 0,
            bio: "string",
            created_at: "2022-06-07T17:23:06.981Z",
            published_at: "2022-06-07T17:23:06.981Z"
        }],
    });

    useEffect(() => {
        getResumes()
    }, []);

    async function getResumes() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "get_resumes_for_applicant",
            params: {}
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_resumes_for_applicant', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(
            res => {
                setState({resumes: res.result})}
        )
    }

    return(
        <div className={"general_background"}>
            <a href="/resume/add_resume">
                <button className="btn btn-success mt-3 add-btn" >Добавить резюме</button>
            </a>
            {state.resumes.map(resume => {
                return (
                    <ResumeCard current_position={resume.current_position} desired_position={resume.desired_position}
                                skills={resume.skills} experience={resume.experience}
                                bio={resume.bio} published_at={resume.published_at}
                                id={resume.id} state={resume.state}/>
                )
            })}
        </div>
    )
}

export default Resume