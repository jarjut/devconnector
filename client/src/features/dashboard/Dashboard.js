import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { deleteAccount, getCurrentProfile } from "../../slices/profileSlice";
import isEmpty from "../../validation/is-empty";
import Education from "./Education";
import Experience from "./Experience";
import ProfileActions from "./ProfileActions";

const Dashboard = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { profile, loading } = useSelector((state) => state.profile);

	const onDeleteClick = () => {
		dispatch(deleteAccount());
	};

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);

	let dashboardContent;

	if (profile === null || loading) {
		dashboardContent = <Spinner />;
	} else {
		// Check if logged in user has profile data
		if (Object.keys(profile).length > 0) {
			dashboardContent = (
				<div>
					<p className="lead text-muted">
						Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
					</p>
					<ProfileActions />
					{isEmpty(profile.experience) ? null : (
						<Experience experience={profile.experience} />
					)}
					{isEmpty(profile.education) ? null : (
						<Education education={profile.education} />
					)}
					<div style={{ marginBottom: "60px" }} />
					<button onClick={() => onDeleteClick()} className="btn btn-danger">
						Delete My Account
					</button>
				</div>
			);
		} else {
			// No Profile
			dashboardContent = (
				<div>
					<p className="lead text-muted">Welcome {user.name}</p>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-lg btn-info">
						Create Profile
					</Link>
				</div>
			);
		}
	}
	return (
		<div className="dashboard">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="display-4">Dashboard</h1>
						{dashboardContent}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
