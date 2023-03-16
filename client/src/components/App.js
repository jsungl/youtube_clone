import React, { Suspense } from 'react';
//import Auth from "../hoc/auth";
import { Route, Routes } from 'react-router-dom';
import Layout from "./views/Layout";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import VideoUploadPage from './views/VideoUploadPage';


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<LandingPage/>} />
        <Route path='video/upload' element={<VideoUploadPage/>} />
      </Route>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
    </Routes>
  );
}
