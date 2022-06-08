import React from "react";
import CustomNavbar from "./CustomNavbar";
import {Outlet} from "react-router-dom";

function Layout() {

    return (
        <>
            <CustomNavbar/>
            <Outlet/>
        </>
    )

}

export default Layout;