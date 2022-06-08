import React, {useEffect, useState} from 'react';
import '../Applicant/Resume.css'
import VacancyCard from "./Cards/VacancyCard";
import {Link} from "react-router-dom";

export interface IVacancy {
    id:number,
    state:string,
    creator_id: number,
    creator_full_name: string,
    position: string,
    experience: number,
    published_at: string,
    department_name: string,
    description: string,
    department_id: number,
    creator_contact: string
}

function Vacancy() {

    const [state, setState] = useState<IVacancy[]>([])

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
                setState(res.result.items)}
        )
    }

    return (
        <div className={"general_background"}>
            <Link to="add_vacancy">
                <button className="btn btn-success mt-3 add-btn" >Добавить Вакансию</button>
            </Link>
            {state.map(vacancy => {
                return (
                    <VacancyCard creator_full_name={vacancy.creator_full_name} experience={vacancy.experience}
                                 position={vacancy.position} state={vacancy.state} id={vacancy.id}/>
                )
            })}
        </div>
    )
}

export default Vacancy