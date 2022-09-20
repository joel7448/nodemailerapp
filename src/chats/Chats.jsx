import "./chats.css"

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

export default function AlignItemsList() {


const inbox = useSelector(state=>state.account);
const dispatch = useDispatch();
const {Inbox,sent}=bindActionCreators(actionCreators,dispatch);
const navigate = useNavigate();

useEffect(()=>{
    fetchdata();
},[])

const fetchdata = async()=>{
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
}
const viewitem = async(id)=>{




navigate(`/mailview/${id}`);
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
                <><ListItem onClick={()=>{viewitem(x._id)}} alignItems="flex-start">
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
  );
}