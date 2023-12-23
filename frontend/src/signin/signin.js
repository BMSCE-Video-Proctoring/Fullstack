import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      'username': '',
      'password': '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log('Form data:', this.state);

    fetch('http://localhost:8000/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          // User successfully registered
          // Display a success message
          console.log('User successfully signed in');
          // this.props.onAuthenticationChange(true);
          window.isAuth = true;
          window.location.replace('/');
        } else {
          // Handle registration failure
          // Display an error message
          console.log('User signin failed');
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error('Error:', error);
      });
  };

  handleClick = (e) => {
    e.preventDefault()
  }

  render() {
    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
            <button  className='form-control btn btn-primary rounded submit px-3' style={{ margin: 20 }} ><Link to="/">Back</Link> {/* Use Link */}</button>
            <div className="container" style={{ marginBottom: 80, marginTop: 50  }}>
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
                            <h3 className="text-center mb-4" style={{ fontWeight: 400 }}>User Login</h3>
                            <form onSubmit={this.handleSubmit} className="login-form" method="POST">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control rounded-left"
                                        placeholder="Username"
                                        required
                                        name="username"
                                        onChange={this.handleInputChange}
                                        value={this.state.username}
                                    />
                                </div>
                                <div className="form-group d-flex">
                                    <input
                                        type="password"
                                        className="form-control rounded-left"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        onChange={this.handleInputChange}
                                        value={this.state.password}
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="form-control btn btn-primary rounded submit px-3">Login</button>
                                </div>
                                <div className="form-group d-md-flex">
                                    <div className="w-50">
                                        <a href="../signup">SignUp</a>
                                    </div>
                                    <div className="w-50 text-md-right">
                                        <a href="#">Forgot Password</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
  }
}

export default LoginPage;