import React, {useState} from "react";
import './Card.css';
import publish from "../../../Images/done.png";
import update from "../../../Images/update.png";
import hide from "../../../Images/hide.png";
import {useNavigate} from "react-router-dom"

function Card(props:any) {

    async function publishResume() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "publish_resume",
            params: {
                id: props.id
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/publish_resume', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
        response.json().then(res => {
            console.log(res);
        })

    }

    async function hideResume() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "hide_resume",
            params: {
                id: props.id
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/hide_resume', {
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
        navigate("/resume/update_resume");
        localStorage.setItem("id", props.id);
        localStorage.setItem("content",props.content)
    }

    function addLeadZero(val:number) {
        if (val < 10) return '0' + val;
        return val;
    }

    return(
        <div className='card-resume'>
            <p>Статус: {props.state === "DRAFT" ? 'Добавлено' : props.state === "PUBLISHED" ? 'Опубликовано' : 'Скрыто'}</p>
            <p>Создано: {addLeadZero(new Date(props.created_at).getDate())}-
                {addLeadZero(new Date(props.created_at).getMonth()+1)}-
                {addLeadZero(new Date(props.created_at).getFullYear())}</p>
            <p>Контент:</p>
            <p className="resume-text">{props.content}</p>
            {props.state === "PUBLISHED" &&
            <div className={"card-buttons"}>
                <div onClick={hideResume}>
                    <img className={"resume-btn"} src={hide}/>
                </div>
            </div>
            }
            {(props.state === "DRAFT" || props.state === "HIDDEN") &&
            <div className={"card-buttons"}>
                <div onClick={publishResume}>
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

export default Card