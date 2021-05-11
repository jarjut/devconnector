import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import InputGroup from "../../components/InputGroup";
import SelectListGroup from "../../components/SelectListGroup";
import TextAreaFieldGroup from "../../components/TextAreaFieldGroup";
import TextFieldGroup from "../../components/TextFieldGroup";
import { createProfile, getCurrentProfile } from "../../slices/profileSlice";

const EditProfile = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors);
	const { profile } = useSelector((state) => state.profile);
	const [state, setState] = useState({
		displaySocialInputs: false,
		handle: "",
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: "",
	});

	useEffect(() => {
		dispatch(getCurrentProfile());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (profile) {
			const skillsCSV = profile.skills.join(",");

			setState({
				...state,
				...profile,
				skills: skillsCSV,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile]);

	const onChange = (e) => {
		console.log(state);
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const profileData = {
			handle: state.handle,
			company: state.company,
			website: state.website,
			location: state.location,
			status: state.status,
			skills: state.skills,
			githubusername: state.githubusername,
			bio: state.bio,
			twitter: state.twitter,
			facebook: state.facebook,
			linkedin: state.linkedin,
			youtube: state.youtube,
			instagram: state.instagram,
		};

		dispatch(createProfile(profileData, history));
	};

	let socialInputs;

	if (state.displaySocialInputs) {
		socialInputs = (
			<div>
				<InputGroup
					placeholder="Twitter Profile URL"
					name="twitter"
					icon="fab fa-twitter"
					value={state.twitter}
					onChange={onChange}
					error={errors.twitter}
				/>

				<InputGroup
					placeholder="Facebook Page URL"
					name="facebook"
					icon="fab fa-facebook"
					value={state.facebook}
					onChange={onChange}
					error={errors.facebook}
				/>

				<InputGroup
					placeholder="Linkedin Profile URL"
					name="linkedin"
					icon="fab fa-linkedin"
					value={state.linkedin}
					onChange={onChange}
					error={errors.linkedin}
				/>

				<InputGroup
					placeholder="YouTube Channel URL"
					name="youtube"
					icon="fab fa-youtube"
					value={state.youtube}
					onChange={onChange}
					error={errors.youtube}
				/>

				<InputGroup
					placeholder="Instagram Page URL"
					name="instagram"
					icon="fab fa-instagram"
					value={state.instagram}
					onChange={onChange}
					error={errors.instagram}
				/>
			</div>
		);
	}

	// Select options for status
	const options = [
		{ label: "* Select Professional Status", value: 0 },
		{ label: "Developer", value: "Developer" },
		{ label: "Junior Developer", value: "Junior Developer" },
		{ label: "Senior Developer", value: "Senior Developer" },
		{ label: "Manager", value: "Manager" },
		{ label: "Student or Learning", value: "Student or Learning" },
		{ label: "Instructor or Teacher", value: "Instructor or Teacher" },
		{ label: "Intern", value: "Intern" },
		{ label: "Other", value: "Other" },
	];

	return (
		<div className="create-profile">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Create Your Profile</h1>
						<p className="lead text-center">
							Let's get some information to make your profile stand out
						</p>
						<small className="d-block pb-3">* = required fields</small>
						<form onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="* Profile Handle"
								name="handle"
								value={state.handle}
								onChange={onChange}
								error={errors.handle}
								info="A unique handle for your profile URL. your full name, company name, nickname"
							/>
							<SelectListGroup
								placeholder="Status"
								name="status"
								value={state.status}
								onChange={onChange}
								options={options}
								error={errors.status}
								info="Give us an idea of where you are at in your career"
							/>
							<TextFieldGroup
								placeholder="Company"
								name="company"
								value={state.company}
								onChange={onChange}
								error={errors.company}
								info="Could be your own company or one you work for"
							/>
							<TextFieldGroup
								placeholder="Website"
								name="website"
								value={state.website}
								onChange={onChange}
								error={errors.website}
								info="Could be your own website or a company one"
							/>
							<TextFieldGroup
								placeholder="Location"
								name="location"
								value={state.location}
								onChange={onChange}
								error={errors.location}
								info="City or city & state suggested (eg. Boston, MA)"
							/>
							<TextFieldGroup
								placeholder="* Skills"
								name="skills"
								value={state.skills}
								onChange={onChange}
								error={errors.skills}
								info="Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)"
							/>
							<TextFieldGroup
								placeholder="Github Username"
								name="githubusername"
								value={state.githubusername}
								onChange={onChange}
								error={errors.githubusername}
								info="If you want your latest repos and a Github link, include your username"
							/>
							<TextAreaFieldGroup
								placeholder="Short Bio"
								name="bio"
								value={state.bio}
								onChange={onChange}
								error={errors.bio}
								info="Tell us a little about yourself"
							/>

							<div className="mb-3">
								<button
									type="button"
									onClick={() => {
										setState((prevState) => ({
											displaySocialInputs: !prevState.displaySocialInputs,
										}));
									}}
									className="btn btn-light"
								>
									Add Social Network Links
								</button>
								<span className="text-muted">Optional</span>
							</div>
							{socialInputs}
							<input
								type="submit"
								value="Submit"
								className="btn btn-info btn-block mt-4"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
