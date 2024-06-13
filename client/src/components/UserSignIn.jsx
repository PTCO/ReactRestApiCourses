import { useContext, useEffect, useRef } from "react";
import UserContext from "../context/userContext";
import { useLocation } from "react-router-dom";

const UserSignIn = () => {
    const { actions , resultMsg } = useContext(UserContext);
    const location = useLocation();
    const emailAddress = useRef("")
    const password = useRef("")

    // Handles submitted form data
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }
        actions.signIn(data, location.state)
    }
    

    return (
        <div className=" vh-100 vw-100">
            <form className="d-flex w-75 mx-auto flex-column justify-content-center" onSubmit={ e => handleSubmit(e)}>
                <legend className="border-bottom border-2 pb-2 fs-2">Sign In</legend>
                <label htmlFor="">Email Address</label>
                <input type="email" name="" id="" className="mb-3 form-control" ref={emailAddress} />
                <label htmlFor="password">Password</label>                
                <input type="password" name="" id="password" className="mb-3 form-control" ref={password}/>
                <span className="d-flex align-items-center mt-1 mb-3">
                    <button type="submit" className=" btn btn-success me-2">Sign In</button>
                    <button type="button" className="btn btn-dark" onClick={ e => actions.navigate('/')}>Cancel</button>
                </span>
                <h3 className={`${resultMsg.length === 0 ? 'd-none':null} ms-2 mb-0 text-danger`}>Validation Errors</h3>
                <ul className="">
                {resultMsg.map( msg => (
                    <li key={msg} className="w-100 my-2 m-0">{msg}</li>
                ))}
                </ul>
            </form>
            <p className="w-75 text-center mt-3 mx-auto">Don't have a user account? Click here to <b onClick={ e => actions.navigate('signin')}>sign in</b>!</p>
        </div>
    );
}

export default UserSignIn;