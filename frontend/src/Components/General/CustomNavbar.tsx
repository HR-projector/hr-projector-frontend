import React, {useEffect} from "react";
import logo from "../../Images/logo.png";
import './General.css'

function CustomNavbar() {

    type User = {
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

    const user:User = JSON.parse(localStorage.getItem('user') as string);
    const roles = {
        'APPLICANT': 'Соискатель',
        'MANAGER': 'Менеджер',
    }

    function get_role(role:string) {
        return role === 'APPLICANT' ? 'Соискатель' : 'Менеджер'
    }

    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar_style">
        <a className="navbar-brand" href="#">
            <img className={"brand"} src={logo}/>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
            {user.role === 'APPLICANT' &&
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/resume">Моё резюме</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Поиск вакансий</a>
                </li>
            </ul>
            }
            {user.role === 'MANAGER' &&
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/vacancy">Мои вакансии</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Список резюме</a>
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