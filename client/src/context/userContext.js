import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
const { createContext, useState, useEffect } = require("react");

const UserContext = createContext();

export const UserProvider = (props) => {        
    const cookie = Cookies.get('authUser');
    const cookieCred = Cookies.get('cred');
    const navigate = useNavigate();
    const [ authUser , setAuthUser] = useState(cookie ? JSON.parse(cookie):null);
    const [ credentials , setCredentials] = useState(cookieCred ? JSON.parse(cookieCred):null);
    const [ resultMsg , setResultMsg] = useState([]);
    
    useEffect(()=>{
        setAuthUser(cookie ? JSON.parse(cookie):null)
        setCredentials(cookieCred ? JSON.parse(cookieCred):null)
    }, [cookie, cookieCred])

    // Handles any error returned by api requests
    const handleErrors = (errors) => {
        if(errors.response.status === 401 || errors.response.status === 400) {
            if(errors.response.data.message) setResultMsg(errors.response.data.message)
            else setResultMsg(errors.response.data)
        } else {
            navigate('/error')
        }
    }

    // Creates a user account and logins user in (creates a cookie with credentials)
    const signUp = async (data) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}users`, data)
        .then( result => {
            Cookies.set('authUser', JSON.stringify(result.data))
            navigate('/')
        })
        .catch( errors => {
            handleErrors(errors);
        })
    }

    // Deletes user cookie and redirects to signout route
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authUser');
        navigate('/signout');
    }

    //Logs a user in when provided with valid authentication data
    const signIn = async (credentials, returnPath) => {
        if(credentials.emailAddress === "" || credentials.password === "") {
            setResultMsg(["Please fill in all fields"])
            return
        }
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}users`, {
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        })
        .then( result => {
            Cookies.set('authUser', JSON.stringify(result.data));
            setAuthUser(result.data);
            if(returnPath) {
                navigate(returnPath.from);
            } else {
                navigate('/')
            }
            
        })
        .catch( error => {
            handleErrors(error);
        })
        .finally( () => { Cookies.set('cred', JSON.stringify(encodedCredentials)); setCredentials(encodedCredentials)})
    }

    return (
        <UserContext.Provider value={{
            authUser,
            resultMsg,
            credentials,
            actions: {
                signIn,
                signUp,
                signOut,
                navigate,
                setResultMsg,
            }
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;