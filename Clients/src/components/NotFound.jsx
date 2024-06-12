import { useContext } from "react";
import CourseContext from "../context/courseContext";

const NotFound = () => {
    const { actions } = useContext(CourseContext)
    return (
        <div className="mt-3 px-3">
            <div className="bg-light p-3 mb-3 rounded">
                <h1 className="mb-2">Not Found</h1>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
            <button className="btn btn-dark" onClick={ e => actions.navigate('/')}>Return to List</button>
        </div>
    );
}

export default NotFound;