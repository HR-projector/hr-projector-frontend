import React from "react";
import '../../Applicant/Cards/Card.css';

function SearchResumeCard(props:any) {

    return(
        <div className='card-resume'>
            <p>Информация о соискателе:</p>
            <p>Почта: {props.email}</p>
            <p>Полное имя: {props.full_name}</p>
            <p>Департамент: {props.department}</p>
            <button className="btn btn-success mt-3 submit btn-width">Добавить в избранное</button>
        </div>
    )
}

export default SearchResumeCard