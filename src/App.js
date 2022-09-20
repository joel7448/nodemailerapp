import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Chats from './chats/Chats';
import Background from './mainpage/background';
import Compose from './compose/Compose';

import Register from './Register/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Newmail from './newmail/Newmail';
import View from './view/View';


function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Register/>}/>
      <Route path="/home" element={<Chats/>}/>
      <Route path="/newmail" element={<Newmail/>}/>
      <Route path="/mailview/:id" element={<View/>}/>
    </Routes>
    
    </BrowserRouter>
   
    
     
    </div>
  );
}

export default App;
