import React from "react";
import '../../Applicant/Cards/Card.css';

function SearchResumeCard(props:any) {

    return(
        <div className='card-resume'>
            <h4>Информация о соискателе:</h4>
            <p>Почта: {props.applicant.email}</p>
            <p>ФИО: {props.applicant.full_name}</p>
            <p>Департамент: {props.applicant.department.name}</p>
            <p className="resume-text">Текущая позиция: {props.current_position}</p>
            <p className="resume-text">Желаемая позиция: {props.desired_position}</p>
            <p>Скил позиция</p>
            {props.skills.map((skill:string) => {
                return (
                    <p>- {skill}</p>
                )
            })}
            <p className="resume-text">Опытная позиция {props.experience} (год/лет)</p>
            <p>Биографическая позиция</p>
            <p className="resume-text">{props.bio}</p>
            <button className="btn btn-success mt-3 submit btn-width">Добавить в избранное</button>
        </div>
    )
}

export default SearchResumeCard