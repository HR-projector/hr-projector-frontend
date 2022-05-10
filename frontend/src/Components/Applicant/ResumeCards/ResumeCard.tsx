import React from "react";
import './ResumeCard.css'

function ResumeCard(props:any) {
    function addLeadZero(val:number) {
        if (val < 10) return '0' + val;
        return val;
    }

    return(
        <div className='card-resume'>
            <p>Создано: {addLeadZero(new Date(props.created_at).getDay())}-
                {addLeadZero(new Date(props.created_at).getMonth()+1)}-
                {addLeadZero(new Date(props.created_at).getFullYear())}</p>
            <p>Контент:</p>
            <p className="resume-text">{props.content}</p>
        </div>
    )
}

export default ResumeCard