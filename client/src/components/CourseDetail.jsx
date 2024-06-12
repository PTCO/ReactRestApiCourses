import { useContext, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { Link, useLocation } from "react-router-dom";
import CourseContext from "../context/courseContext";
import axios from "axios";
import UserContext from "../context/userContext";

const CourseDetail = () => {
    const location = useLocation();
    const { authUser } = useContext(UserContext);
    const { actions } = useContext(CourseContext);
    const [ course , setCourse ] = useState();

    const [ isDelete , setIsDelete] = useState(false);

    useEffect(()=>{
        (async()=>{
            await axios.get('http://localhost:5000/api/courses/' + location.pathname.substring(9))
            .then( result => setCourse(result.data))
            .catch( errros => {
                if(errros.response.status !== 500) actions.navigate('/notFound');
                else actions.navigate('/error')
            })
        })()
    }, [])

    if(course){
        return(
            <>
            <div className="d-flex align-items-center courseDetialNav mt-3 px-2 ps-md-3 bg-light py-3">
                { authUser && course.userId === authUser.id ?
                <>
                <Link className="btn btn-lg btn-dark w-100" to={`/courses/${location.pathname.substring(9)}/update`} state={{from: location.pathname.substring(9)}}>Update Course</Link>
                <button className="btn btn-lg btn-dark mx-3 w-100" onClick={ e => setIsDelete(true) }>Delete Course</button>
                <Link  className="btn btn-lg border border-2 bg-white w-100" to={"/"}>Return to List</Link>
                </>
                :
                <Link  className="btn btn-lg border border-2 bg-white w-100" to={"/"}>Return to List</Link>
                }
            </div>
            <div className={`${isDelete ? null:'d-none'} ps-3 my-4`}>
                <p className="fs-4">Are you sure you would like to delete this <b>Course</b>?</p>
                <span className="d-flex align-items-center">
                    <button className="btn btn-success me-2" onClick={ e => actions.deleteCourse(location.pathname.substring(9))}>Confirm</button>
                    <button className="btn btn-danger" onClick={ e => setIsDelete(false)}>Cancel</button>
                </span>
            </div>
            <h3 className="ps-3 mt-3 mb-4 pb-3">Course Detail</h3>

            <div className="row px-3 justify-content-between">
                <div className="col-12 col-sm-7 mb-4 mb-md-0">
                    <h5 className="border-bottom border-2 pb-1 mb-1">COURSE</h5>
                    <h1>{course.title}</h1>
                    <p className="mb-4 fs-5">By {course.User.firstName} {course.User.lastName}</p>
                    <ReactMarkdown>
                        {course.description}
                    </ReactMarkdown>
                </div>
                <div className="col-12 col-sm-4">
                    <div className="mb-2 pb-2">
                        <h5 className="border-bottom border-2 ms-2 pb-1 mb-2">ESTIMATED TIME</h5>
                        <ReactMarkdown>
                            { course.estimatedTime }
                        </ReactMarkdown>
                    </div>
                    <div>
                        <h5 className="border-bottom border-2 ms-2 pb-1 mb-2">MATERIALS NEEDED</h5>
                        <ReactMarkdown>
                            {course.materialsNeeded}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default CourseDetail;