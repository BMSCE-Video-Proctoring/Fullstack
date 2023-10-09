import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './landing.css'

function handleClick(e) {
	e.preventDefault()
}

const NavLinks = ({ isAuthenticated }) => (
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
	  {window.isAuth ? (
		<p>
		  <Link to="/">Logout</Link> {/* Use Link */}
		</p>
	  ) : (
		<p>
		  <Link to="/signin">Login</Link> {/* Use Link */}
		</p>
	  )}
	</React.Fragment>
  );

const Landing = ({ isAuthenticated }) => {
	return (
		<React.Fragment>
			
			{/* NAVBAR */}
			<div className="landing-navbar">
				<div className="landing-navbar-logo">
					<img src={logo} alt="BMS-logo" />
				</div>
				<div className="landing-navbar-links">
					<NavLinks isAuthenticated={isAuthenticated} />
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


		</React.Fragment>
	);
}

export default Landing;