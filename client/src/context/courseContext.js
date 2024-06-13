import axios from "axios";
import { createContext, useContext, useState } from "react";
import UserContext from "./userContext";
import { useNavigate } from "react-router-dom";

const CourseContext = createContext();

export const CourseProvider = (props) => {
    const { credentials } = useContext(UserContext);
    const [ errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // Handles any error returned by api requests
    const handleErrors = (errors) => {
        if(errors.response.status === 401 || errors.response.status === 400) {
            if(errors.response.data.message && errors.response.data.message[0] === "Incorrect Password OR Email") navigate('/forbidden')
            if(errors.response.data.message) setErrors(errors.response.data.message)
            else setErrors(errors.response.data)
        } else {
            navigate('/error')
        }
    }

    // Creates a coursewith user credentials
    const createCourse = async (data) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}courses`, data,  {
            headers: {
                Authorization: `Basic ${credentials}`
            }
        })
        .then( ()=> navigate('/'))
        .catch( errors => handleErrors(errors))
    }

    // Finds a updates intened course with new data
    const updateCourse = async (data, courseID) => {
        setErrors([]);
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}courses/` + courseID, data, {
            headers: {
                Authorization: `Basic ${credentials}`
            }
        })
        .then( () => navigate(`/courses/${courseID}`))
        .catch( errors => handleErrors(errors));
    }

    // Delete the intended course
    const deleteCourse = async (courseID) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}courses/` + courseID, {
            headers: {
                Authorization: `Basic ${credentials}`
            }
        })
        .then( () => navigate('/'))
        .catch( errors => handleErrors(errors));
    }

    return (
        <CourseContext.Provider value={{
            errors,
            actions: {
                createCourse,
                navigate,
                updateCourse,
                setErrors,
                deleteCourse
            }
        }}>
            {props.children}
        </CourseContext.Provider>
    )
}

export default CourseContext;