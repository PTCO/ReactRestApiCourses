
import { useContext } from "react";
import UserContext from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);

    if(authUser) {
        return <Outlet />
    } else {
        return <Navigate to="/forbidden" state={{from: "unauthorized"}} />
    }
}

export default PrivateRoute;