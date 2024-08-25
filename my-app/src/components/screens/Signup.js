import React, { useState,useEffect,useContext } from 'react';
import './log.css';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import querystring from 'query-string'
import { UserContext } from '../../App';
import './form.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Corrected variable name for spelling
    const navigate = useNavigate(); // Updated variable name for clarity
    const location = useLocation()
    const {ubdateData}=useContext(UserContext)
    const[nextPath,setNextPatch]=useState("")
    

    useEffect(()=>{
        const {search}=location
        const value = querystring.parse(search)
        const {next}=value
        setNextPatch(next)
    },[location])

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setMessage(''); // Clear previous messages

        axios.post(`http://127.0.0.1:8000/api/v1/auth/token/`, { username, password })
            .then((response) => {
                console.log(response)
                const data = response.data;
                localStorage.setItem('user_data', JSON.stringify(data));
                ubdateData({type:'login',payload:data})
                navigate('/'); // Navigate to the home page after login
                nextPath ? navigate(nextPath) : navigate('/')
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setMessage("Unauthorized: Incorrect username or password.");
                } else {
                    setMessage("An error occurred. Please try again later.");
                }
            });
    };
   
    

    return (
        <div className='container'>
            <div className='login-page'>
                <div className='form-box'>
                    <h1>Welcome Back</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <input 
                                type='text' // Changed type to text if it's a username; use 'email' if the field expects an email
                                value={username} 
                                placeholder='Username' // Changed placeholder to match input type
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='input-container'>
                            <input 
                                type='password' 
                                value={password} 
                                placeholder='Password' 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {message && <div className='error-message'><p>{message}</p></div>}
                        <button type='submit' className='login-button'>Login</button>
                    </form>
                    <div className='signup-link'>
                        <Link to='/register' className='custom-link'>

                            <div className='span'>Don't have an account? Create one</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
