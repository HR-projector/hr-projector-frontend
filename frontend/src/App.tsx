import React, {Component} from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import Resume from "./Components/Applicant/Resume"
import './App.css';
import ResumeForm from "./Components/Applicant/ResumeForm";
import ResumeUpdateForm from "./Components/Applicant/ResumeUpdateForm";


class App extends Component{
    render() {

        return (
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/reg" element={<Registration/>} />
                    <Route path="/resume" element={<Resume/>} />
                    <Route path="/resume/add_resume" element={<ResumeForm/>} />
                    <Route path="/resume/update_resume" element={<ResumeUpdateForm/>} />
                </Routes>
            </Router>
        );
    }
}

export default App;
