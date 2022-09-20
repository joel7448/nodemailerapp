import { ArrowDownward, KeyboardArrowDown } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import {actionCreators, Inbox,sent,view} from "../Action-creators/account-action"
import instance from '../api/api';
import ResponsiveAppBar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import "./view.css"
function View() {

    const {id} = useParams();
    const inbox = useSelector(state=>state.account);
    const dispatch = useDispatch();
    const {Inbox,sent,view} = bindActionCreators(actionCreators,dispatch)


const viewitems = async()=>{
    const data = await instance.get(`/server/email/mailitems/${id}`);
    view(data.data);
    // console.log(data.data);
    

}
useEffect(()=>{
viewitems();
 
},[])

  return (<>
  <ResponsiveAppBar/>
<div className='overall-wraper'>
<Sidebar/>
    <div className='view'>
        
    <div className="subview">
        {inbox.map((x)=>{
            return(<div><h1>{x.subject}</h1>
            <p className='fromusername'>{x.from}</p>
            <div className='flexing'> <Avatar className='AVATAR' src="/broken-image.jpg" /><span className="tousername">{x.to}<KeyboardArrowDown/></span></div>
          
           
            <div className='container'>
            {x.content}
            </div>
            </div>
            
            )
        })}
        </div>
       
    </div>
    </div>
    </>
  )
}

export default View