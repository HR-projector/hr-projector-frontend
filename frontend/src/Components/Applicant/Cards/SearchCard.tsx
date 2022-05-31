import React from "react";
import './Card.css';

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
            <p>Заказчик:{props.creator_full_name}</p>
            <p>Департамент: {props.department_name}</p>
            <p>Требуется опыт разработки: {props.experience} (в годах)</p>
            <p>Позиция: {props.experience} (в годах)</p>
            <button className="btn btn-success mt-3 submit btn-width">Откликнуться на вакансию</button>
        </div>
    )
}

export default SearchCard