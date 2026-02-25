import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="*" element={<NoPage />}></Route>
          <Route path="signUp" element={<Signup />}></Route>
          <Route path="login" element={<Login />}></Route>

          <Route path='/editor/:projectID' element={<Editor/>}></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
