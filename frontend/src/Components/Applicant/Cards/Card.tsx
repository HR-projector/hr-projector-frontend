import React, {useEffect, useState} from "react";
import './Card.css';
import publish from "../../../Images/done.png";
import update from "../../../Images/update.png";
import hide from "../../../Images/hide.png";
import {useNavigate} from "react-router-dom"

function Card(props:any) {

    const [status,setStatus] = useState(props.state)

    useEffect(() => {
        setStatus(status)
    }, [status]);

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
            setStatus(res.result.state)
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
            setStatus(res.result.state)
            console.log(res);
        })

    }

    const navigate = useNavigate();

    function RouteToUpdate() {
        navigate(`update_resume/?id=${props.id}&current_position=${props.current_position}&desired_position=${props.desired_position}&skills=${props.skills}&experience=${props.experience}&bio=${props.bio}`);
    }

    function addLeadZero(val:number) {
        if (val < 10) return '0' + val;
        return val;
    }

    return(
        <div className='card-resume'>
            <p>????????????: {status === "DRAFT" ? '??????????????????' : status === "PUBLISHED" ? '????????????????????????' : '????????????'}</p>
            <p>??????????????: {addLeadZero(new Date(props.created_at).getDate())}-
                {addLeadZero(new Date(props.created_at).getMonth()+1)}-
                {addLeadZero(new Date(props.created_at).getFullYear())}</p>
            <h4>??????????????:</h4>
            <p className="resume-text">?????????????? ??????????????: {props.current_position}</p>
            <p className="resume-text">???????????????? ??????????????: {props.desired_position}</p>
            <p>????????????:</p>
            {props.skills.map((skill:string) => {
                return (
                    <p>- {skill}</p>
                )
            })}
            <p className="resume-text">???????? ????????????????????: {props.experience} (??????/??????)</p>
            <p>????????????:</p>
            <p className="resume-text">{props.bio}</p>
            {status === "PUBLISHED" &&
            <div>
                <div className={"card-buttons"}>
                    <div onClick={hideResume}>
                        <img className={"resume-btn"} src={hide}/>
                    </div>
                </div>
                <div onClick={()=>{localStorage.setItem("response_id", props.id)}}>
                    <button className="btn btn-primary">???????????????? ?? ????????????</button>
                </div>
            </div>
            }
            {(status === "DRAFT" || status === "HIDDEN") &&
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