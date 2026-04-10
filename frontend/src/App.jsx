import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Editor from './pages/Editor';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path='/'
          element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
        />

        <Route path='/signup' element={<Signup />} />
        <Route
          path='/login'
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path='/editor/:projectID'
          element={isLoggedIn ? <Editor /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={isLoggedIn ? <NoPage /> : <Navigate to="/login" />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;