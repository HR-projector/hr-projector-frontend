import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import ResumeCard from "./Cards/Card";
import {IResume} from "../Manager/ResumeSearch";
import {Link} from "react-router-dom";

function Resume() {
    const [state, setState] = useState<IResume[]>([]);

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
                setState(res.result)}
        )
    }

    return(
        <div className={"general_background"}>
            <Link to="add_resume">
                <button className="btn btn-success mt-3 add-btn" >Добавить резюме</button>
            </Link>
            {state.map(resume => {
                return (
                    <ResumeCard current_position={resume.current_position} desired_position={resume.desired_position}
                                skills={resume.skills} experience={resume.experience}
                                bio={resume.bio} published_at={resume.published_at}
                                id={resume.id} state={resume.state} created_at={resume.created_at}/>
                )
            })}
        </div>
    )
}

export default Resume