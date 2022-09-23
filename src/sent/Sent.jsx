

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Compose from "../compose/Compose";
import Sidebar from "../sidebar/Sidebar";
import ResponsiveAppBar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {Inbox,sent} from "../Action-creators/account-action"
import { bindActionCreators } from "redux";
import { actionCreators } from "../Action-creators";
import { useEffect } from "react"
import instance from "../api/api";
import { useNavigate } from "react-router-dom";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

function Sent() {


    const inbox = useSelector(state=>state.account);
    const dispatch = useDispatch();
    const {Inbox,sent}=bindActionCreators(actionCreators,dispatch);
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetchdata();
    },[])
    
    const fetchdata = async()=>{
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
    const viewitem = async(id)=>{
    
    
    
    
    navigate(`/mailview/${id}`);
    }
    
    const handledelete =async (itemid)=>{
      try{
      await instance.delete(`server/email/mailitems/${itemid}`);
      alert("successfully deleted");
      }
      catch(err){
        console.log(err);
        alert("Failed to delete");
      }
      fetchdata();
    }






  return (
    <>
    <ResponsiveAppBar/>
    <div className="pagewrap">
  
      <Sidebar/>
      <div className="chatwrapper">
         
      <List className="list" sx={{ width: '100%', bgcolor: 'background.paper' }}>
          { inbox.map((x)=>{
              return(
                  <><ListItem  alignItems="center">
          <ListItemAvatar>
            <Avatar alt={x.from} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={x.subject}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {x.from}
                </Typography>
                {` ${x.content}`}
              </React.Fragment>
            }
          />
          <Tooltip title="View"  onClick={()=>{viewitem(x._id)}}>
            <IconButton>
          <RemoveRedEye/>
          </IconButton>
          </Tooltip>
          <Tooltip onClick={()=>{handledelete(x._id)}} title="Delete">
            <IconButton>
             <Delete/>  
             </IconButton> 
             </Tooltip>
        </ListItem>
        <Divider variant="inset" component="li" /></>
              )
          })
        
  
          }
       
      </List>
     <Compose/>
      </div>
      </div>
      </>
  )
}

export default Sent