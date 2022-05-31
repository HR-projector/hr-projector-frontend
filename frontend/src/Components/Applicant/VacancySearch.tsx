import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import General from "../General/General";
import SearchCard from "./Cards/SearchCard";

function VacancySearch() {

    const [state, setState] = useState({
        vacancies:[{
            id: 0,
            creator_id: 0,
            creator_full_name: "string",
            department_id: 0,
            department_name: "string",
            position: "string",
            experience: 0,
            published_at: "2022-05-30T19:43:55.427Z"
        }]
    });

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
                setState({vacancies: res.result.items})}
        )
    }

    return (
        <div className={"general_background"}>
            <General />
            {state.vacancies.map(vacancy => {
                return (
                    <SearchCard creator_full_name={vacancy.creator_full_name} experience={vacancy.experience}
                                 position={vacancy.position}  department_name={vacancy.department_name}
                                published_at={vacancy.published_at}
                    />
                )
            })}
        </div>
    )
}

export default VacancySearch