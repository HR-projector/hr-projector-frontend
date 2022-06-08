import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import SearchResumeCard from "./Cards/SearchResumeCard";
import VacancyCard from "./Cards/VacancyCard";
import {IVacancy} from "./Vacancy";
import {IResume} from "./ResumeSearch";

export interface IResponse {
    id: number,
    vacancy: IVacancy,
    resume: IResume,
    applicant_message: string
}

function VacancyResponses() {

    const [state, setState] = useState<IResponse[]>([]);

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
                setState(res.result.items)
                console.log(res)
            }
        )
    }


    return (
        <div className={"general_background"}>
            {state.map(response => {
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