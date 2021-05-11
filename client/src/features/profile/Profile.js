/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProfileByHandle } from "../../slices/profileSlice";

const Profile = () => {
	const dispatch = useDispatch();
	const { profile, loading } = useSelector((state) => state.profile);
	const { handle } = useParams();
	const history = useHistory();

	useEffect(() => {
		if (handle) {
			dispatch(getProfileByHandle(handle));
		}
	}, []);

	// TODO: Bug not found
	useEffect(() => {
		if (profile === null && loading) {
			history.push("/not-found");
		}
	}, [profile]);

	let profileContent;

	if (profile === null || loading) {
		profileContent = <Spinner />;
	} else {
		profileContent = (
			<div>
				<div className="row">
					<div className="col-md-6">
						<Link to="/profiles" className="btn btn-light mb-3 float-left">
							Back To Profiles
						</Link>
					</div>
					<div className="col-md-6" />
				</div>
				<ProfileHeader profile={profile} />
				<ProfileAbout profile={profile} />
				<ProfileCreds
					education={profile.education}
					experience={profile.experience}
				/>
				{profile.githubusername && (
					<ProfileGithub username={profile.githubusername} />
				)}
			</div>
		);
	}
	return (
		<div className="profile">
			<div className="container">
				<div className="row">
					<div className="col-md-12">{profileContent}</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
