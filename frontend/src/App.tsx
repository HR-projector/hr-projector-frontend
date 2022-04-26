import React, {Component} from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Registration from "./Components/Registration/Registration";
import './App.css';


class App extends Component{
    render() {

        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/reg" element={<Registration/>} />
                </Routes>
            </Router>
        );
    }
}

export default App;
