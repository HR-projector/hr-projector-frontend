import React from "react";
import './Card.css';
import ProstoModalka from "../ProstoModalka";

function SearchCard(props:any) {

    function addLeadZero(val:number) {
        if (val < 10) return '0' + val;
        return val;
    }

    return(
        <div className='card-resume'>
            <p>Создано: {addLeadZero(new Date(props.published_at).getDate())}-
                {addLeadZero(new Date(props.published_at).getMonth()+1)}-
                {addLeadZero(new Date(props.published_at).getFullYear())}</p>
            <p>Заказчик: {props.creator_full_name}</p>
            <p>Департамент: {props.department_name}</p>
            <p>Требуется опыт разработки: {props.experience} (в годах)</p>
            <p>Позиция: {props.experience} (в годах)</p>
            <button type="button" className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#prostoModalka">
                Откликнуться на вакансию
            </button>
            <ProstoModalka vacancy_id={props.vacancy_id}/>
        </div>
    )
}

export default SearchCard