import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/userContext";

const Forbidden = () => {
    const location = useLocation();
    const { authUser , actions } = useContext(UserContext);
    return(
        <div className="mt-3 px-3">
            <div className="bg-light p-3 mb-3 rounded">
                <h1 className="mb-2">Forbidden</h1>
                <p>Oh oh! You can't access this page.</p>
            </div>
            { authUser && location.state && location.state.from === "unauthorized" ?   /* 
                Displays a not owner message to user if they do not own the course or
                displays a sign in prompt to user if they are not authenticated or logged in   
            */
            <>
            <p className="mb-2 fs-3">You are not the owner of this <b>Course</b>.</p>
            <button className="btn btn-dark" onClick={ e => actions.navigate('/')}>Return to List</button>
            </>      
            :
            <>
            <p className="mb-2 fs-3">You need to <b>login</b> to continue.</p>
            {/* Redirects user to signin page - when user logins in "state" value sent will navigate user back to course create page */}
            <Link className="btn btn-dark me-2" to="/signin" state={{from: "/courses/create"}} >
                Sign In
            </Link>
            <button className="btn border border-2" onClick={ e => actions.navigate('/')}>Cancel</button>
            </>
            }
        </div>
    );
}

export default Forbidden;