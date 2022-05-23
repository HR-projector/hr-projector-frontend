import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import General from "../General/General";
import ResumeCard from "./ResumeCards/ResumeCard";

function Resume() {
    const [state, setState] = useState({
        resumes:[{
            id: 0,
            state: "DRAFT",
            content: "string",
            created_at: "2022-05-10T10:32:37.018Z",
            published_at: "2022-05-10T10:32:37.018Z"
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
            <General />
            <a href="/resume/add_resume">
                <button className="btn btn-success mt-3 add-btn" >Добавить резюме</button>
            </a>
            {state.resumes.map(resume => {
                return (
                    <ResumeCard content={resume.content} created_at={resume.created_at} id={resume.id} state={resume.state}/>
                )
            })}
        </div>
    )
}

export default Resume