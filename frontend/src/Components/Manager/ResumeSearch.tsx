import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import General from "../General/General";
import SearchResumeCard from "./Cards/SearchResumeCard";

function ResumeSearch() {

    const [state, setState] = useState({
        resumes:[{
            id: 0,
            email: "user@example.com",
            full_name: "string",
            department: {
                id: 0,
                name: "string"
            }
        }]
    });

    useEffect(() => {
        getApplicantsForManager()
    }, []);

    async function getApplicantsForManager() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "get_applicants_for_manager",
            params: {}
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_applicants_for_manager', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(
            res => {
                setState({resumes: res.result.items})}
        )
    }

    return (
        <div className={"general_background"}>
            <General />
            {state.resumes.map(resume => {
                return (
                    <SearchResumeCard email={resume.email} full_name={resume.full_name}
                                      department={resume.department.name}/>
                )
            })}
        </div>
    )
}

export default ResumeSearch