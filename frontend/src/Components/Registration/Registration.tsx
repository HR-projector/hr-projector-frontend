import React from 'react';
import '../HomePage/Home.css';
import logo from "../../Images/logo.png"
import RegForm from './RegForm'

function Registration() {

    return (
        <div className={"background"}>
            <div className={"form"}>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-5">
                            <RegForm />
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

export default Registration;