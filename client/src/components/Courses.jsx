import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/userContext";

const Courses = () => {
    const [ courses , setCourses ] = useState([]);
    const { actions } = useContext(UserContext);

    // Loads all courses
    useEffect(()=>{
        (async()=>{
            await axios.get('https://reactrestapicourses-production.up.railway.app/api/courses')
            .then( result => setCourses(result.data))
            .catch( errors => {
                actions.navigate('/error');
            })
        })()
    }, [])

    return (
        <div className="container-fluid mt-4">
            <div className="row g-4">
                { courses.map( course => (
                <Link key={course.id} className="CourseBox col-12 col-sm-4 text-decoration-none" to={"/courses/" + course.id}>
                    <div className="h-100 border border-2 p-3 rounded"> 
                        <p className="m-0">Course</p>
                        <h2>{course.title}</h2>
                    </div>
                </Link>
                ))}
                <Link className="CourseBox col-12 col-sm-4 text-decoration-none" to={"/courses/create"}>
                    <div className="h-100 border border-2 p-3 rounded">        
                        <h3 className="m-0">+ New Course</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Courses;