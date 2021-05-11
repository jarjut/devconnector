import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextFieldGroup from "../../components/TextFieldGroup";
import { loginUser } from "../../slices/authSlice";

const Login = () => {
	const [values, setValues] = useState({ email: "", password: "" });
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const history = useHistory();

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email: values.email,
			password: values.password,
		};

		dispatch(loginUser(userData));
	};

	useEffect(() => {
		if (isAuthenticated) {
			history.push("/dashboard");
		}
	}, [history, isAuthenticated]);

	return (
		<div className="login">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Log In</h1>
						<p className="lead text-center">
							Sign in to your DevConnector account
						</p>
						<form noValidate onSubmit={onSubmit}>
							<TextFieldGroup
								type="email"
								name="email"
								placeholder="Email Address"
								value={values.email}
								onChange={onChange}
								error={errors.email}
							/>

							<TextFieldGroup
								type="password"
								name="password"
								placeholder="Password"
								value={values.password}
								onChange={onChange}
								error={errors.password}
							/>

							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
