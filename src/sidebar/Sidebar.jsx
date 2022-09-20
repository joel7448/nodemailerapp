import { Add, DoubleArrowOutlined, Home, Logout, Send, SendOutlined } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"

import { useNavigate } from "react-router-dom"
import instance from "../api/api";
import "./sidebar.css"
import { useDispatch, useSelector } from "react-redux";
import {Inbox,sent} from "../Action-creators/account-action"
import { bindActionCreators } from "redux";
import { actionCreators } from "../Action-creators";

function Sidebar() {

const  inbox=  useSelector(state=>state.account);
const dispatch = useDispatch();
const {Inbox,sent} = bindActionCreators(actionCreators,dispatch);


const navigate = useNavigate();
   const logout = ()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
   
   } 

   const home =async ()=>{
    try{
        const inboxitems=  await instance.get(`/server/email/inbox/${localStorage.getItem('user')}`,{
          headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
        });
        Inbox(inboxitems.data);
        console.log(inboxitems.data);
          }
          catch(err){
              console.log(err);
          }
    navigate("/home");
   }

   const send = async()=>{
    try{
    const data =await  instance.get(`/server/email/sent/${localStorage.getItem('user')}`,{
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
    })
    sent(data.data);
    console.log(data.data);
   
}
catch(err){
    console.log(err);
}


   }
  return (
    <div className="sidebarwrapper">
    <Tooltip title="Inbox">
  <IconButton>
    <Home onClick={()=>{home()}} className="icon"/>
  </IconButton>
</Tooltip>
<Tooltip title="Sent Items">
  <IconButton>
    <Send onClick={()=>{send()}} className="icon"/>
  </IconButton>
</Tooltip>

<Tooltip title="Logout"   >
  <IconButton >
    <Logout onClick={()=>{logout()}}   className="icon"/>
  </IconButton>
</Tooltip>
    </div>
  )
}

export default Sidebar