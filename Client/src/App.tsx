import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar1 from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Verify from "./components/pages/Verify";
import Forgot from "./components/pages/Forgot";
import Property from "./components/pages/Property";

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar1 />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/verify" element={<Verify />} />

        <Route path="/forgot" element={<Forgot />} />
        
        <Route path="/property" element={<Property />} />
      </Routes>
    </>
  );
}

export default App;
