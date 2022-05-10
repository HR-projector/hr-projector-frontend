import React from 'react';
import './Login.css';
import logo from "../../Images/logo.png";
import LoginForm from "./LoginForm";

function Login() {

    return (
        <div className={"background"}>
            <div className={"form"}>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-5">
                            <LoginForm />
                        </div>
                        <div className="col-md-7">
                            <div className={"logo"}>
                                <img src={logo}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;