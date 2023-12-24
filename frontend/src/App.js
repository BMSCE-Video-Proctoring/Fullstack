import React, { useEffect } from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom'


import RegistrationForm from './signup/signup';
import LoginPage from './signin/signin';
import ExamWindow from './exam-window/examWindow';
import TestCreation from './testCreation/testCreation';
import Landing from './landing/landing';
import {loadUser} from './action/user'

import {  useDispatch, useSelector } from 'react-redux';

function App() {
  window.isAuth = false;
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const handleAuthenticationChange = (newStatus) => {
  //   setIsAuthenticated(newStatus);
  // };

  const dispatch= useDispatch()
  
  const {isAuthenticated}= useSelector(state=> state.user)
   useEffect(()=>{
     dispatch(loadUser())
   },[dispatch])

  // const dispatch= useDispatch()
  
  // const {isAuthenticated}= useSelector(state=> state.user)
  //  useEffect(()=>{
  //    dispatch(loadUser())
  //  },[dispatch])
  
  return (
    // // !isAuthenticated?<LoginPage />: 
    // <BrowserRouter>
    // <Routes>

    //   <Route path='/' element={<Landing isAuthenticated={isAuthenticated} />} />
    //   <Route path='/signup' element={<RegistrationForm />} />
    //   <Route path='/signin' element={<LoginPage isAuthenticated={isAuthenticated} onAuthenticationChange={handleAuthenticationChange} />} />
    //   <Route path='/exam' element={<ExamWindow isAuthenticated={isAuthenticated} />} />
    //   <Route path='/createTest' element={<TestCreation />} />

    // </Routes>
    // </BrowserRouter>


    

    // !isAuthenticated?<LoginPage />: 
    // <BrowserRouter>
    // <Routes>

      // <Route path='/' element={<Landing isAuthenticated={isAuthenticated} />} />
      // <Route path='/signup' element={<RegistrationForm />} />
      // <Route path='/signin' element={<LoginPage isAuthenticated={isAuthenticated} onAuthenticationChange={handleAuthenticationChange} />} />
      // <Route path='/exam' element={<ExamWindow isAuthenticated={isAuthenticated} />} />
      // <Route path='/createTest' element={<TestCreation />} />

    // </Routes>
    // </BrowserRouter>



    <BrowserRouter>
    {!isAuthenticated ? (
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<RegistrationForm />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/exam/:testCode' element={<LoginPage />} />
        <Route path='/createTest' element={<LoginPage />} />
      </Routes>
    ) : (
      <>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/exam/:testCode' element={<ExamWindow />} />
          <Route path='/createTest' element={<TestCreation />} />
        </Routes>
      </>
    )}
    </BrowserRouter>
   
   
  );
}

export default App;
