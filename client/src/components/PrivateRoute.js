import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const auth = useSelector((state) => state.auth);
	return (
		<Route
			{...rest}
			render={(props) =>
				auth.isAuthenticated === true ? (
					<Component {...props} />
				) : (
					<Redirect to="/Login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
