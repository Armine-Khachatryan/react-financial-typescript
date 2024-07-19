import React, {useState} from 'react';
import './App.css';
import { Mainlayout } from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import { MultiStepsForm } from './Pages/MultiStepsForm/MultiStepsForm';
import { FormikExample } from './Pages/Formik/Formik';
import { UserMain } from './Pages/UserHome/UserHome';
import { PersonalInfo } from './Pages/PersonalInfo/PersonalInfo';
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import SignUp from "./Pages/SignUp/SignUp";
import {SignUpPin} from "./Components/SignUpPin/SignUpPin";
import Calculator from "./Pages/Calculator/Calculator";

interface AppProps {}

function App(props: AppProps){


  const [token, setToken] = useState<string>(localStorage.getItem('token') || "");

  console.log(token, "freshToken")
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainlayout />} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login_pin" element={<SignUpPin/>} />
          <Route path="/steps-form" element={<MultiStepsForm />} />
          {/*<Route path="/formik" element={<FormikExample />} />*/}
          <Route path="/home" element={<UserMain />} />
          <Route path="/info" element={<PersonalInfo />} />
          <Route path="/calculator" element={<Calculator token={token}/>} />
          <Route path="/change-password" element={<ChangePassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
