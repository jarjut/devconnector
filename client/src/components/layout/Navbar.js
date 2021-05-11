import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../slices/authSlice";
import { clearCurrentProfile } from "../../slices/profileSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const onLogoutClick = (e) => {
		e.preventDefault();
		dispatch(clearCurrentProfile());
		dispatch(logoutUser());
	};

	const authLinks = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/feed">
					Post Feed
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/dashboard">
					Dashboard
				</Link>
			</li>
			<li className="nav-item">
				<a href="logout" onClick={onLogoutClick} className="nav-link">
					<img
						className="rounded-circle"
						src={user.avatar}
						alt={user.name}
						style={{ width: "25px", marginRight: "5px" }}
						title="You must have a Gravatar connected to your email to display an image"
					/>
					Logout
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/register">
					Sign Up
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/login">
					Login
				</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
			<div className="container">
				<Link className="navbar-brand" to="/">
					DevConnector
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#mobile-nav"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="mobile-nav">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/profiles">
								{" "}
								Developers
							</Link>
						</li>
					</ul>
					{isAuthenticated ? authLinks : guestLinks}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
