import React from "react";
import './General.css';
import {IUser} from "./CustomNavbar";

function HomePage() {

    const user:IUser = JSON.parse(localStorage.getItem('user') as string);

    return (
        <div className="background">
            <p className="greeting">
                <h3>Приветсвуем в приложении, {user.first_name}!</h3>
            </p>
        </div>
    )

}

export default HomePage;