import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import TextFieldGroup from "../../components/TextFieldGroup";
import { registerUser } from "../../slices/authSlice";

const Register = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const errors = useSelector((state) => state.errors);

	const onChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			name: state.name,
			email: state.email,
			password: state.password,
			password2: state.password2,
		};

		dispatch(registerUser(newUser, history));
	};
	return (
		<div className="register">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Sign Up</h1>
						<p className="lead text-center">Create your DevConnector account</p>
						<form noValidate onSubmit={onSubmit}>
							<TextFieldGroup
								type="text"
								name="name"
								placeholder="Name"
								value={state.name}
								onChange={onChange}
								error={errors.name}
							/>
							<TextFieldGroup
								type="email"
								name="email"
								placeholder="Email Address"
								value={state.email}
								onChange={onChange}
								error={errors.email}
								info="site uses Gravatar so if you want a profile image,
										use a Gravatar email"
							/>
							<TextFieldGroup
								type="password"
								name="password"
								placeholder="Password"
								value={state.password}
								onChange={onChange}
								error={errors.password}
							/>
							<TextFieldGroup
								type="password"
								name="password2"
								placeholder="Confirm Password"
								value={state.password2}
								onChange={onChange}
								error={errors.password2}
							/>

							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
