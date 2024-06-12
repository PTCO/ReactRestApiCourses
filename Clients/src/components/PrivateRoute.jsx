
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
    const { authUser , actions } = useContext(UserContext);

    if(authUser) {
        return <Outlet />
    } else {
        return <Navigate to="/forbidden" state={{from: "unauthorized"}} />
    }
}

export default PrivateRoute;