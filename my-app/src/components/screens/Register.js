import './login.css'
import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import axios from 'axios'
import './form.css'

function Register() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [messege,setMessege]=useState('')
    const navigate = useNavigate()
    const {ubdateData}=useContext(UserContext)
    const handleSubmit = (e)=>{
        setMessege('')
        e.preventDefault()
        if (!email || !password || !name) {
            setMessege('Please fill in all fields.');
            return;
        }
    
        axios
        .post(`http://127.0.0.1:8000/api/v1/auth/register/`,{email,password,name})
        .then((response)=>{
            console.log(response.data)
            const data = response.data.data
            console.log(data)
            const custom_status_code = response.data.status
            if(custom_status_code===6000){
                localStorage.setItem('user_data',JSON.stringify(data))
                ubdateData({
                    type:"LOGIN",
                    payload:data
                })
                navigate('/'); // Navigate to the home page after login
            }else{
                setMessege(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error.response)
            if(error.response && error.response.status === 400){
                setMessege(error.response.data.message)
            
            }else{
                setMessege('please try again')
            }
        })
    }
  return (
    <div>
       <div className='container'>
        <div className='left-page'>
            
        </div>
            <div className='login-page'>
                <div className='form-box'>
                    <form onSubmit={handleSubmit} className='form-box'>
                        <div className='input-container'>
                            <div>Name</div>
                            <input 
                             type='text'
                             value={name}
                             onChange={(e)=>setName(e.target.value)}
                             placeholder='Name'
                            />
                        </div>
                        <div className='input-container'>
                            <div>Email</div>
                            <input 
                            type='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Email'
                            />
                        </div> 
                        <div className='input-container'>
                            <div>Password</div>
                            <input type='Password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        {messege && <div className='error-message'><p>{messege}</p></div>}
                        <button type='submit' className='login-button '>Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register


