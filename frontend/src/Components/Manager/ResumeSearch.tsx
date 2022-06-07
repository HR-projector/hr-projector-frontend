import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import SearchResumeCard from "./Cards/SearchResumeCard";

function ResumeSearch() {

    const [state, setState] = useState({
        resumes:[{
            id: 0,
            applicant: {
                id: 0,
                email: "user@example.com",
                full_name: "string",
                department: {
                    id: 0,
                    name: "string"
                }
            },
            current_position: "string",
            desired_position: "string",
            skills: [
                "string"
            ],
            experience: 0,
            bio: "string"
        }]
    });

    useEffect(() => {
        getResumesForManager()
    }, []);

    async function getResumesForManager() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "get_resumes_for_manager",
            params: {}
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_resumes_for_manager', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(
            res => {
                setState({resumes: res.result.items})
                console.log(res)
            }
        )
    }
    
    
    // async function getApplicantsForManager() {
    //     let body = {
    //         jsonrpc: "2.0",
    //         id: 0,
    //         method: "get_applicants_for_manager",
    //         params: {}
    //     }
    //
    //     let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_applicants_for_manager', {
    //         method: 'POST',
    //         headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
    //         body: JSON.stringify(body)
    //     });
    //     response.json().then(
    //         res => {
    //             setState({resumes: res.result.items})}
    //     )
    // }

    return (
        <div className={"general_background"}>
            {state.resumes.map(resume => {
                return (
                    <SearchResumeCard applicant={resume.applicant} current_position={resume.current_position}
                                      desired_position={resume.desired_position} skills={resume.skills}
                                      experience={resume.experience} bio={resume.bio}
                    />
                )
            })}
        </div>
    )
}

export default ResumeSearch