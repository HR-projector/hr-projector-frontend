import React from "react";
import logo from "../../Images/logo.png";
import './General.css'

function CustomNavbar() {

    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar_style">
        <a className="navbar-brand" href="#">
            <img className={"brand"} src={logo}/>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/resume">Моё резюме</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Поиск вакансий</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/vacancy">Мои вакансии</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Список резюме</a>
                </li>
            </ul>
        </div>
    </nav>
    )
}

export default CustomNavbar