import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import SearchCard from "./Cards/SearchCard";
import {IVacancy} from "../Manager/Vacancy";

function VacancySearch() {

    const [state, setState] = useState<IVacancy[]>([]);

    useEffect(() => {
        getVacanciesForApplicant()
    }, []);

    async function getVacanciesForApplicant() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "get_vacancies_for_applicant",
            params: {}
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_vacancies_for_applicant', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(
            res => {
                setState( res.result.items)}
        )
    }

    return (
        <div className={"general_background"}>
            {state.map(vacancy => {
                return (
                    <SearchCard creator_full_name={vacancy.creator_full_name} experience={vacancy.experience}
                                 position={vacancy.position}  department_name={vacancy.department_name}
                                published_at={vacancy.published_at} vacancy_id={vacancy.id}
                    />
                )
            })}
        </div>
    )
}

export default VacancySearch