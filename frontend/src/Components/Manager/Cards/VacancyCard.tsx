import React, {useState} from "react";
import '../../Applicant/Cards/Card.css';
import publish from "../../../Images/done.png";
import update from "../../../Images/update.png";
import hide from "../../../Images/hide.png";
import {useNavigate} from "react-router-dom"

function VacancyCard(props:any) {

    async function publishVacancy() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "publish_vacancy",
            params: {
                id: props.id
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/publish_vacancy', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(res => {
            console.log(res);
        })

    }

    async function hideVacancy() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "hide_resume",
            params: {
                id: props.id
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/hide_vacancy', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(res => {
            console.log(res);
        })

    }

    const navigate = useNavigate();

    function RouteToUpdate() {
        navigate(`update_vacancy/?id=${props.id}&position=${props.position}&experience=${props.experience}`);
    }

    function addLeadZero(val:number) {
        if (val < 10) return '0' + val;
        return val;
    }

    return(
        <div className='card-resume'>
            <p>Статус: {props.state === "DRAFT" ? 'Добавлено' : props.state === "PUBLISHED" ? 'Опубликовано' : 'Скрыто'}</p>
            <p>Создатель: {props.creator_full_name}</p>
            <p>Позиция разработчика: {props.position}</p>
            <p>Необходимый опыт: {props.experience} (лет)</p>
            <p className="resume-text">{props.content}</p>
            {props.state === "PUBLISHED" &&
            <div className={"card-buttons"}>
                <div onClick={hideVacancy}>
                    <img className={"resume-btn"} src={hide}/>
                </div>
            </div>
            }
            {(props.state === "DRAFT" || props.state === "HIDDEN") &&
            <div className={"card-buttons"}>
                <div onClick={publishVacancy}>
                    <img className={"resume-btn"} src={publish}/>
                </div>
                <div onClick={RouteToUpdate}>
                    <img className={"resume-btn"} src={update}/>
                </div>
            </div>
            }
        </div>
    )
}

export default VacancyCard