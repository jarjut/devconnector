import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import CreateProfile from "./features/create-profile/CreateProfile";
import EditProfile from "./features/edit-profile/EditProfile";
import AddExperience from "./features/add-credentials/AddExperience";
import AddEducation from "./features/add-credentials/AddEducation";
import Profiles from "./features/profiles/Profiles";
import Profile from "./features/profile/Profile";
import Posts from "./features/posts/Posts";
import Post from "./features/post/Post";
import NotFound from "./features/not-found/NotFound";

import "./App.css";
import setInterceptor from "./utils/setInterceptor";
import { setCurrentUser } from "./slices/authSlice";

// Axios Interceptor
setInterceptor();
// Check for token
if (localStorage.jwtToken) {
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App" style={{ minHeight: "450px" }}>
					<Navbar />
					<Route exact path="/" component={Landing} />
					<div className="container">
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profiles" component={Profiles} />
						<Route exact path="/profile/:handle" component={Profile} />
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/edit-profile"
								component={EditProfile}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/add-experience"
								component={AddExperience}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/add-education"
								component={AddEducation}
							/>
						</Switch>
						<Switch>
							<PrivateRoute exact path="/feed" component={Posts} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/post/:id" component={Post} />
						</Switch>
						<Route exact path="/not-found" component={NotFound} />
					</div>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
