
import { Send } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { useFormik } from "formik"
import instance from "../api/api"
import ResponsiveAppBar from "../navbar/Navbar"
import Sidebar from "../sidebar/Sidebar"
import "./newmail.css"

function Newmail() {

const formik = useFormik({
    initialValues:{
        username:`${localStorage.getItem("user")}`,
        recipient:"",
        content:"",
        subject:""
    },
    validate:(values)=>{
        const errors={};
        if(!errors.to){
        errors.to = "Enter to address"
        }
        if(!errors.subject){
            errors.subject = "Please enter a subject"
        }
        if(!errors.content){
            errors.content = "Please type a text message"
        }
    },
    onSubmit :async (values)=>{
        try{
await instance.post(`/server/email/send`,values,{
    headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
})

        console.log(values);    
}
catch(err){
    console.log(err);
}
    }
})


  return (
    <>
    <ResponsiveAppBar/>
    <div className="newmailwrapper">
        <Sidebar/> 
    <div className='backgroundpaper'>
        <form onSubmit={formik.handleSubmit}>
     <TextField
     className="from"
          disabled
          id="outlined-disabled"
          label="From"
          name="username"
          onChange={formik.handleChange}
          value={localStorage.getItem('user')}
          defaultValue={localStorage.getItem("user")}
        />
         <TextField
         className="from"
          name="recipient"
          onChange={formik.handleChange}
          value={formik.values.recipient}
          id="outlined-required"
          label="To"
          
        />
         <TextField
         className="from"
          name="subject"
          onChange={formik.handleChange}
          value={formik.values.subject}
          id="outlined-required"
          label="Subject"
          
        />
        <Button type="submit" className="from button" variant="contained" endIcon={<Send />}>
  Send
</Button>
<div className="commentbox">
<textarea name = "content" value={formik.values.content} onChange={formik.handleChange} >
    
</textarea>
</div>
        </form>
      
    </div>
    </div>
    </>

  )
}

export default Newmail