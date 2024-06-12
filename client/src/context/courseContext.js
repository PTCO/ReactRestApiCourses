import axios from "axios";
import { createContext, useContext, useState } from "react";
import UserContext from "./userContext";
import { useNavigate } from "react-router-dom";

const CourseContext = createContext();

export const CourseProvider = (props) => {
    const { authUser } = useContext(UserContext);
    const [ errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleErrors = (errors) => {
        if(errors.response.status === 401 || errors.response.status === 400) {
            if(errors.response.data.message) setErrors(errors.response.data.message)
            else setErrors(errors.response.data)
        } else {
            navigate('/error')
        }
    }

    const createCourse = async (data) => {
        await axios.post('http://localhost:5000/api/courses', data, {
            headers: {
                Authorization: `Bearer ${authUser.emailAddress}:${authUser.password}`
            }
        })
        .then( ()=> navigate('/'))
        .catch( errors => handleErrors(errors))
    }

    const updateCourse = async (data, courseID) => {
        setErrors([]);
        await axios.put('http://localhost:5000/api/courses/' + courseID, data)
        .then( () => navigate(`/courses/${courseID}`))
        .catch( errors => handleErrors(errors));
    }

    const deleteCourse = async (courseID) => {
        await axios.delete('http://localhost:5000/api/courses/' + courseID)
        .then( () => navigate('/'))
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