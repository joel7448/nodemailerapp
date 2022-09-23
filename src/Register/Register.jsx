import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import instance from '../api/api';
import "./register.css"


function Register() {
const navigate = useNavigate();



const formik = useFormik({
    initialValues : {
        name:"",
        email:"",
        username:"",
        password:""

    },validate:(values)=>{
const errors = {};
if(!values.name){
    errors.name = "Enter name";
}
if(!values.email){
    errors.email = "Enter email";
}
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
const register = await instance.post("/server/users/register",values)
alert("Registered sucessfully!");
console.log(register.data);
navigate("/login");
}
catch(err){
    alert("Failed to register");
    console.log("Registration unsuccessfull");
}

    }
});


  return (
    <div className='loginwrapper'>
    <form className='login' onSubmit={formik.handleSubmit} >

        <TextField fullWidth name='name' onChange={formik.handleChange} value={formik.values.name} label="Name" id="fullWidth" />
        <TextField fullWidth name='email' onChange={formik.handleChange} value = {formik.values.email} label="Email" id="fullWidth" />
        <TextField fullWidth name='username' onChange={formik.handleChange} value={formik.values.username} label="Username" id="fullWidth" />
        <TextField fullWidth name='password' type="password" onChange={formik.handleChange} value={formik.values.password} label="Password" id="fullWidth" />
        <Button type="submit" className='loginbutton' variant="contained">Register</Button>
        <Link to="/login">Already an user ?</Link>
        </form>
        
        </div>
  )
}

export default Register