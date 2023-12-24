import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './landing.css'
import { logoutUser, loadUser } from '../action/user';
import {  useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

function handleClick(e) {
	e.preventDefault()
}

const NavLinks = ({ isAuthenticated, handleLogout }) => (
	<React.Fragment>
	  <p>
		<Link to="/">Blog</Link> {/* Use Link */}
	  </p>
	  <p>
		<Link to="/">Product</Link> {/* Use Link */}
	  </p>
	  <p>
		<Link to="/">Community</Link> {/* Use Link */}
	  </p>
	  <p>
		<Link to="/">Pricing</Link> {/* Use Link */}
	  </p>
	  <p>
		<Link to="/">Contact Us</Link> {/* Use Link */}
	  </p>
	  {isAuthenticated ? (
		<p>
		  <Link to="/" onClick={handleLogout} >Logout</Link> {/* Use Link */}
		</p>
	  ) : (
		<p>
		  <Link to="/signin">Login</Link> {/* Use Link */}
		</p>
	  )}
	</React.Fragment>
  );

const Landing = () => {
	const dispatch= useDispatch()
	const [openDialog, setOpenDialog] = useState(false);
  
	const {isAuthenticated}= useSelector(state=> state.user)
	useEffect(()=>{
		dispatch(loadUser())
	},[dispatch])

	// const handleLogout = () => {
	// 	dispatch(logoutUser());
	// };

	const handleLogout = () => {
		setOpenDialog(true);
	};
	
	const confirmLogout = () => {
		setOpenDialog(false);
		dispatch(logoutUser());
	};

	const cancelLogout = () => {
		setOpenDialog(false);
	};

	return (
		<React.Fragment>
			
			{/* NAVBAR */}
			<div className="landing-navbar">
				<div className="landing-navbar-logo">
					<img src={logo} alt="BMS-logo" />
				</div>
				<div className="landing-navbar-links">
					<NavLinks isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
				</div>

			</div>

			<div className="section-type landing-page">
			<div className="landing-content">
					<div className="headings">
						<span className="sub-text">Advanced & Automated</span>
						<span className="main-heading gradient-text">
							Proctoring Solution
						</span>
					</div>

					<p className="desc">
						A straightforward framework built for online proctoring
						to create online tests within minutes,{' '}
						<i>effortlessly</i>.
					</p>
				</div>
				<div className="landing-cta">
					<a href="/createTest">
						<button className="ctabutton">Create a test</button>
					</a>

					<p className="desc">OR</p>
					<div className="input-item unique-link">
						<input type='text' placeholder="Unique test code" />
						<span className="join-link">
							<a href="/exam">Join</a>
						</span>
					</div>
				</div>
			</div>

			<Dialog open={openDialog} onClose={cancelLogout}>
			<DialogTitle>Confirm Logout</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to logout?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={cancelLogout}>Cancel</Button>
				<Button onClick={confirmLogout}>Logout</Button>
			</DialogActions>
      		</Dialog>


		</React.Fragment>
	);
}

export default Landing;