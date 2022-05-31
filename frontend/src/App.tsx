import React, {Component} from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import Resume from "./Components/Applicant/Resume"
import './App.css';
import ResumeForm from "./Components/Applicant/ResumeForm";
import ResumeUpdateForm from "./Components/Applicant/ResumeUpdateForm";
import Vacancy from "./Components/Manager/Vacancy";
import VacancyForm from "./Components/Manager/VacancyForm";
import VacancyUpdateForm from "./Components/Manager/VacancyUpdateForm";
import VacancySearch from "./Components/Applicant/VacancySearch";
import ResumeSearch from "./Components/Manager/ResumeSearch";


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
                    <Route path="/resume/search_resume" element={<ResumeSearch/>} />
                    <Route path="/vacancy" element={<Vacancy/>} />
                    <Route path="/vacancy/add_vacancy" element={<VacancyForm/>} />
                    <Route path="/vacancy/update_vacancy" element={<VacancyUpdateForm/>} />
                    <Route path="/vacancy/search_vacancy" element={<VacancySearch/>} />
                </Routes>
            </Router>
        );
    }
}

export default App;
