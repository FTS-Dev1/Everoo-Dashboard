// Events.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Catering from './Components/Catering/Catering';


const AllServices = () => {
    return (
        <div>
            <h2>Events Component</h2>
            <Routes>
                {/* <Route path="/catering" element={<Catering/>} /> */}
                {/* <Route path="blogs" element={<Beverages />} /> */}
            </Routes>
        </div>
    );
};

export default AllServices;
