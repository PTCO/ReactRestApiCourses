import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/userContext";
import CourseContext from "../context/courseContext";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const { errors , actions } = useContext(CourseContext)
    
    const title = useRef("")
    const desc = useRef("")
    const estTime = useRef("")
    const materials = useRef("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userId: authUser.id,
            title: title.current.value,
            desc: desc.current.value,
            estTime: estTime.current.value,
            materials: materials.current.value
        }
        actions.createCourse(data)
    }

    useEffect(()=>{
        actions.setErrors([]);
    }, [])

    return (
        <>
            <h3 className="mx-3 border-bottom border-2 pb-3 mb-3">Create Course</h3>
            <h3 className={`${errors.length === 0 ? 'd-none':null} ms-3 mb-0 text-danger`}>Validation Errors</h3>
            <ul className="ms-2 mb-4">
            {errors.map( msg => (
                <li key={msg} className="w-100 my-2 m-0">{msg}</li>
            ))}
            </ul>
            <form className="row px-3 justify-content-between" onSubmit={ e => handleSubmit(e)}>
                <div className="col-12 col-sm-7 d-flex flex-column">
                    <label htmlFor="title">Course Title</label>
                    <input className="form-control" type="text" ref={title} id="title" />
                    <p className="mt-2">By {authUser.firstName} {authUser.lastName}</p>
                    <label htmlFor="desc">Course Description</label>
                    <textarea className="form-control" ref={desc} id="desc"></textarea>
                </div>
                <div className="col-12 col-sm-4 d-flex flex-column">
                    <label htmlFor="estTime">Estimated Time</label>
                    <input className="form-control" type="text" ref={estTime} id="estTime" />
                    <label className="mt-3" htmlFor="materials">Materials Needed</label>
                    <textarea className="form-control" ref={materials} id="materials"></textarea>
                </div>
                <span className="mt-3">
                    <button className="btn btn-dark me-2" style={{width: "10em"}} type="submit">Create Course</button>
                    <button className="btn border border-2 " style={{width: "10em"}} type="button" onClick={ e => {actions.setErrors([]); actions.navigate('/')}}>Cancel</button>
                </span>
            </form>
        </>
    );
}

export default CreateCourse;