import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import SearchResumeCard from "./Cards/SearchResumeCard";
import VacancyCard from "./Cards/VacancyCard";

function VacancyResponses() {

    const [state, setState] = useState({
        responses: [
            {
                id: 0,
                vacancy: {
                    id: 0,
                    creator_id: 0,
                    creator_full_name: "string",
                    creator_contact: "string",
                    department_id: 0,
                    department_name: "string",
                    position: "string",
                    experience: 0,
                    description: "string",
                    published_at: "2022-06-07T18:19:01.068Z"
                },
                resume: {
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
                },
                applicant_message: "string"
            }
                  ]
    });

    useEffect(() => {
        getResumesForManager()
    }, []);

    async function getResumesForManager() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "get_vacancy_responses_for_manager",
            params: {}
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_vacancy_responses_for_manager', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(
            res => {
                setState({responses: res.result.items})
                console.log(res)
            }
        )
    }


    return (
        <div className={"general_background"}>
            {state.responses.map(response => {
                return (
                    <div>
                        <p>Резюме соискателя</p>
                        <SearchResumeCard applicant={response.resume.applicant} current_position={response.resume.current_position}
                                          desired_position={response.resume.desired_position} skills={response.resume.skills}
                                          experience={response.resume.experience} bio={response.resume.bio}
                        />
                        <p>Вакансия работодателя</p>
                        <VacancyCard creator_full_name={response.vacancy.creator_full_name} experience={response.vacancy.experience}
                                     position={response.vacancy.position}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default VacancyResponses;