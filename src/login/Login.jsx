import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import instance from '../api/api';
import "./login.css"
function Login() {

    const navigate = useNavigate();



    const formik = useFormik({
        initialValues : {
           
            username:"",
            password:""
    
        },validate:(values)=>{
    const errors = {};
  
    if(!values.username){
        errors.name = "Enter username";
    }
    if(!values.password){
        errors.name = "Enter password";
    }
    return errors;
    
        },
        onSubmit:async(values)=>{
    try{
       const login =  await instance.post("/server/users/signin",values);
       localStorage.setItem("token",login.data.token);
       localStorage.setItem("user",login.data.username);
       console.log(login.data);
       alert("login success")
        navigate("/home");
    }
    catch(err){
        alert("Login failed");
        console.log(err);
    }
   
    
        }
    });

  return (
    <div className='loginwrapper'>
    <form className='register' onSubmit={formik.handleSubmit} >

        <TextField fullWidth name='username' onChange={formik.handleChange} value={formik.values.username} label="Username" id="fullWidth" />
        <TextField fullWidth name='password' type="password" onChange={formik.handleChange} value={formik.values.password} label="Password" id="fullWidth" />
        <Button type="submit" className='loginbutton' variant="contained">Login</Button>

        </form>

        </div>
  )
}

export default Login