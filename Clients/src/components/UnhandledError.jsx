import { useContext } from "react";
import UserContext from "../context/userContext";

const UnhandledError = () => {
    const { actions } = useContext(UserContext)
    return (
        <div className="mt-3 px-3">
            <div className="bg-light p-3 mb-3 rounded">
                <h1 className="mb-2">Error</h1>
                <p>Sorry! We just encountered an unexpected error.</p>
            </div>
            <button className="btn btn-dark" onClick={ e => actions.navigate('/')}>Return to List</button>
        </div>
    );
}

export default UnhandledError;