import React from "react";
import './Home.css';
import Customers from './Pages/Customers';
import Accounts from './Pages/Accounts';
import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";

const ContentBox = () => {
    return (
        <div className="contentBox">
            <Routes>
                <Route path="/" element={<Home/>} /> {/* Empty on initial load */}
                <Route path="/customers" element={<Customers />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="*" element={<div>Select a menu item</div>} />
            </Routes>

            
        </div>
    );
}
export default ContentBox;

