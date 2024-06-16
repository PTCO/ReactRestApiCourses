import { act, useContext, useEffect, useState } from "react";
import CourseContext from "../context/courseContext";
import UserContext from "../context/userContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateCourse = () => {
    const { authUser } = useContext(UserContext);
    const { errors , actions } = useContext(CourseContext)
    const location = useLocation();

    // Gets intended course's data on component load
    useEffect(()=>{
        if(!location.state) return actions.navigate('/forbidden', { state: { from: 'unauthorized'}});
        (async()=>{
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}courses/` + location.state.from)
            .then( result => {   
                setTitle(result.data.title)
                setDesc(result.data.description)
                setEstTime(result.data.estimatedTime)
                setMaterials(result.data.materialsNeeded)
                setCourseID(result.data.id)
            })
            .catch( errors => {
                if(errors.response.status !== 500) actions.navigate('/notFound');
                else actions.navigate('/error')
            })
        })()
    }, [])

    // Displays current course detaials in form inputs
    const fillFields = (data) => {
        return data;
    }


    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [estTime, setEstTime] = useState("")
    const [materials, setMaterials] = useState("")     
    const [courseID, setCourseID] = useState("")     

    /* handleSubmit : Updates Course & Redirects to Course Details 
       @params {object} e : form element event object
    */    
    const handleSubmit = (e) => {
        e.preventDefault();
        // data object with course input details
        const data = {
            userId: authUser.id,
            title,
            desc,
            estTime,
            materials
        }
        // Updates course with new input data
        actions.updateCourse(data, courseID)
    }
    return(
        <>
            <h3 className="mx-3 border-bottom border-2 pb-3 mb-3">Update Course</h3>
            <h3 className={`${errors.length === 0 ? 'd-none':null} ms-3 mb-0 text-danger`}>Validation Errors</h3>
            <ul className="ms-2 mb-4">
            {errors.map( msg => (
                <li key={msg} className="w-100 my-2 m-0">{msg}</li>
            ))}
            </ul>
            <form className="row px-3 justify-content-between" onSubmit={ e => handleSubmit(e)}>
                <div className="col-12 col-sm-7 d-flex flex-column">
                    <label htmlFor="title">Course Title</label>
                    <input className="form-control" type="text" value={title} onChange={ e => { setTitle(e.target.value)}} id="title" />
                    <p className="mt-2">By {authUser.firstName} {authUser.lastName}</p>
                    <label htmlFor="desc">Course Description</label>
                    <textarea className="form-control" value={desc} onChange={ e => {setDesc(e.target.value)}} id="desc"></textarea>
                </div>
                <div className="col-12 col-sm-4 d-flex flex-column">
                    <label htmlFor="estTime">Estimated Time</label>
                    <input className="form-control" type="text" value={estTime} onChange={ e => {setEstTime(e.target.value)}} id="estTime" />
                    <label className="mt-3" htmlFor="materials">Materials Needed - Seperate with ","</label>
                    <textarea className="form-control" value={materials} onChange={ e => {setMaterials(e.target.value)}} id="materials"></textarea>
                </div>
                <span className="mt-3">
                    <button className="btn btn-dark me-2" style={{width: "10em"}} type="submit">Update Course</button>
                    <button className="btn border border-2 " style={{width: "10em"}} type="button" onClick={ e => {actions.setErrors([]); actions.navigate('/')}}>Cancel</button>
                </span>
            </form>
        </>
    );
    }

export default UpdateCourse;