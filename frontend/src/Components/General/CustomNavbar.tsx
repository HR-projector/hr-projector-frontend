import React from "react";
import logo from "../../Images/logo.png";
import {Link} from 'react-router-dom'
import './General.css'

export interface IUser {
    id:number,
    email: string,
    first_name: string,
    last_name: string,
    patronymic: string,
    department: {
        id: number,
        name: string
    },
    role: string
}

function CustomNavbar() {

    const user:IUser = JSON.parse(localStorage.getItem('user') as string);

    function get_role(role:string) {
        return role === 'APPLICANT' ? 'Соискатель' : 'Менеджер'
    }

    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar_style">
        <Link to="/" className="navbar-brand">
            <img className={"brand"} src={logo}/>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
            {user.role === 'APPLICANT' &&
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="resume">Моё резюме</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="vacancy/search_vacancy">Поиск вакансий</Link>
                </li>
            </ul>
            }
            {user.role === 'MANAGER' &&
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="vacancy">Мои вакансии</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="resume/search_resume">Список резюме</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="vacancy/vacancy_responses">Список откликов на вакансии</Link>
                </li>
            </ul>
            }
        </div>
        <div>
            <p className="user">{user.last_name} {user.first_name} ({get_role(user.role)})</p>
        </div>
    </nav>
    )
}

export default CustomNavbar