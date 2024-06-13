import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

const UserSignOut = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();
    // Redirects logged out user to home page and signs user out
    useEffect(()=>{
        actions.signOut();
        navigate('/')
    }, [])
}

export default UserSignOut;