import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import './App.css';
import Login from "./components/Login/Login";
import UsersTable from "./components/UsersTable";
import Registration from "./components/Registration/Registration";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/Profile/Profile";

function App() {

    useEffect(():any=>{

    })

  return (
    <div className="App">
        <div className="App-header">
            <Navigation/>
        </div>
        <Routes>
            <Route path="/" element={<UsersTable/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/reg" element={<Registration/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </div>
  );
}

export default App;




