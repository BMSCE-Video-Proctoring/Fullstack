import React, { useEffect } from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom'


import RegistrationForm from './signup/signup';
import LoginPage from './signin/signin';

import {  useDispatch, useSelector } from 'react-redux';

function App() {
  // const dispatch= useDispatch()
  
  // const {isAuthenticated}= useSelector(state=> state.user)
  //  useEffect(()=>{
  //    dispatch(loadUser())
  //  },[dispatch])
  
  return (
    // !isAuthenticated?<LoginPage />: 
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<RegistrationForm />} />
      <Route path='/signin' element={<LoginPage />} />
     
    </Routes>
    </BrowserRouter>
   
   
  );
}



export default App;