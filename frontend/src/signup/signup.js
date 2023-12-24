// import React, { Component } from 'react';
// import './style.css';
// import { useDispatch } from 'react-redux';
// import { signUpUser } from '../action/user';

// class RegistrationForm extends Component {
//   constructor() {
//     super();
//     this.state = {
//       'username': '',
//       'name': '',
//       'email': '',
//       'password1': '',
//       'password2': '',
//     };
//   }

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();

//     console.log('Form data:', this.state);

//     const dispatch = useDispatch();

//     dispatch(signUpUser(this.state.username, this.state.name, this.state.email, this.state.password1, this.state.password2));

//     // fetch('http://localhost:8000/signup/', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify(this.state),
//     // })
//     //   .then((response) => {
//     //     if (response.status === 200) {
//     //       // User successfully registered
//     //       // Display a success message
//     //       console.log('User successfully registered');
//     //       window.location.replace('/');
//     //     } else {
//     //       // Handle registration failure
//     //       // Display an error message
//     //       console.log('User registration failed');
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     // Handle network or other errors
//     //     console.error('Error:', error);
//     //   });
//   };

//   render() {
    // return (
    //   <div>
    //     {/* Registration form JSX */}
    //     <div className="container" style={{marginBottom: 80, marginTop: 50}}>
    //       <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
    //       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    //       <div className="row justify-content-center">
    //         <div className="col-md-6 text-center mb-4">
    //           <h2 className="heading-section" style={{ fontWeight: 550 }}>BMSCE Procturing</h2>
    //         </div>
    //       </div>
    //       <div className="row justify-content-center">
    //         <div className="col-md-7 col-lg-10">
    //           <div className="login-wrap p-4 p-md-5">
    //             <div className="icon d-flex align-items-center justify-content-center">
    //               <span className="fa fa-user-o"></span>
    //             </div>
    //             <h3 className="text-center mb-4" style={{ fontWeight: 400 }}>User Register</h3>
    //             <form onSubmit={this.handleSubmit} className="login-form" method="POST">
    //               <div className="form-group">
    //                 <input type="text" className="form-control rounded-left" placeholder="Username" required name="username" onChange={this.handleInputChange} value={this.state.username} />
    //               </div>
    //               <div className="form-group">
    //                 <input type="text" className="form-control rounded-left" placeholder="Full Name" required name="name" onChange={this.handleInputChange} value={this.state.name} />
    //               </div>
    //               <div className="form-group d-flex">
    //                 <input type="email" className="form-control rounded-left" placeholder="Email" required name="email" onChange={this.handleInputChange} value={this.state.email} />
    //               </div>
    //               <div className="form-group d-flex">
    //                 <input type="password" className="form-control rounded-left" placeholder="Password" required name="password1" onChange={this.handleInputChange} value={this.state.password1} />
    //               </div>
    //               <div className="form-group">
    //                 <input type="password" className="form-control rounded-left" placeholder="Confirm Password" required name="password2" onChange={this.handleInputChange} value={this.state.password2} />
    //               </div>
    //               <div className="form-group">
    //                 <button type="submit" className="form-control btn btn-primary rounded submit px-3">Register</button>
    //               </div>
    //               <div className="form-group d-md-flex">
    //                 <div className="w-50">
    //                   <label className="checkbox-wrap checkbox-primary">
    //                     <span style={{ color: 'black' }}>I agree to all </span>
    //                     <span><a href="#">Terms & Conditions</a></span>
    //                     <input type="checkbox" checked />
    //                     <span className="checkmark"></span>
    //                   </label>
    //                 </div>
    //                 <div className="w-50 text-md-right">
    //                   <a href="../signin/">SignIn</a>
    //                 </div>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
//   }
// }

// export default RegistrationForm;

import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../action/user';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
    dispatch(signUpUser(formData.username, formData.name, formData.email, formData.password1, formData.password2));
  };

  return (
    <div>
      {/* Registration form JSX */}
      <div className="container" style={{marginBottom: 80, marginTop: 50}}>
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h2 className="heading-section" style={{ fontWeight: 550 }}>BMSCE Procturing</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-10">
            <div className="login-wrap p-4 p-md-5">
              <div className="icon d-flex align-items-center justify-content-center">
                <span className="fa fa-user-o"></span>
              </div>
              <h3 className="text-center mb-4" style={{ fontWeight: 400 }}>User Register</h3>
              <form onSubmit={handleSubmit} className="login-form" method="POST">
                <div className="form-group">
                  <input type="text" className="form-control rounded-left" placeholder="Username" required name="username" onChange={handleInputChange} value={formData.username} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control rounded-left" placeholder="Full Name" required name="name" onChange={handleInputChange} value={formData.name} />
                </div>
                <div className="form-group d-flex">
                  <input type="email" className="form-control rounded-left" placeholder="Email" required name="email" onChange={handleInputChange} value={formData.email} />
                </div>
                <div className="form-group d-flex">
                  <input type="password" className="form-control rounded-left" placeholder="Password" required name="password1" onChange={handleInputChange} value={formData.password1} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control rounded-left" placeholder="Confirm Password" required name="password2" onChange={handleInputChange} value={formData.password2} />
                </div>
                <div className="form-group">
                  <button type="submit" className="form-control btn btn-primary rounded submit px-3">Register</button>
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50">
                    <label className="checkbox-wrap checkbox-primary">
                      <span style={{ color: 'black' }}>I agree to all </span>
                      <span><a href="#">Terms & Conditions</a></span>
                      <input type="checkbox" checked />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="w-50 text-md-right">
                    <a href="../signin/">SignIn</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
