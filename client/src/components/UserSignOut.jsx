import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserSignOut = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/')
    }, [])
}

export default UserSignOut;