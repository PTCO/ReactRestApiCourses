import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

const Header = () => {
    const navigate = useNavigate();
    const { authUser , actions } = useContext(UserContext);

    return (
        <>
            <header className="d-flex header align-items-center bg-dark justify-content-between mb-2 py-2 px-3">
                <h1 className="text-white" style={{cursor: "pointer"}} onClick={ e => navigate("/")}>Courses</h1>
                { authUser ? 
                    <span className="d-flex align-items-center">
                        <h2 className="fs-4 userName text-white">Welcome, { authUser.firstName} {authUser.lastName}</h2>
                        <button className="btn text-white border-white" onClick={ e => navigate('/signout')}>Sign Out</button>
                    </span>
                :
                <span className="d-flex align-items-center">  
                    <button className="btn text-white border-white me-2" onClick={ e => { actions.setResultMsg([]); navigate('signup')}}>Sign Up</button>
                    <button className="btn text-white border-white" onClick={ e => { actions.setResultMsg([]); navigate('signin')}}>Sign In</button>
                </span>
                }
            </header>
            <Outlet />
        </>
    );
}

export default Header;