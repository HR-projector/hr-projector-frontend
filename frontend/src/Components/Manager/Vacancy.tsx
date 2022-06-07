import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import VacancyCard from "./Cards/VacancyCard";

function Vacancy() {

    const [state, setState] = useState({
        vacancies:[{
            id: 0,
            state: "DRAFT",
            creator_id: 0,
            creator_full_name: "string",
            position: "string",
            experience: 0,
            published_at: "2022-05-24T11:26:44.661Z"
        }],
    });

    useEffect(() => {
        getVacancies()
    }, []);

    async function getVacancies() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "get_vacancies_for_manager",
            params: {}
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/get_vacancies_for_manager', {
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
            <a href="/vacancy/add_vacancy">
                <button className="btn btn-success mt-3 add-btn" >Добавить Вакансию</button>
            </a>
            {state.vacancies.map(vacancy => {
                return (
                    <VacancyCard creator_full_name={vacancy.creator_full_name} experience={vacancy.experience}
                                 position={vacancy.position} state={vacancy.state} id={vacancy.id}/>
                )
            })}
        </div>
    )
}

export default Vacancy