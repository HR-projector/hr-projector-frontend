import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import SearchResumeCard from "./Cards/SearchResumeCard";

export interface IResume {
    id: number,
    applicant: {
        id: number,
        email: string,
        full_name: string,
        department: {
            id: number,
            name: string
        }
    },
    current_position: string,
    desired_position: string,
    skills: string[],
    experience: number,
    bio: string
    created_at: string,
    published_at: string,
    state: string
}

function ResumeSearch() {

    const [state, setState] = useState<IResume[]>([]);

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
                setState(res.result.items)
                console.log(res)
            }
        )
    }

    return (
        <div className={"general_background"}>
            {state.map(resume => {
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