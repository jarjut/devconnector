import axios from "axios";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileAction";
import store from "../store";

const setInterceptor = (history = null) => {
	axios.interceptors.request.use(
		(config) => {
			const token = localStorage.jwtToken;
			if (token) {
				config.headers["Authorization"] = "Bearer " + token;
			}
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		(response) => {
			return Promise.resolve(response);
		},
		async (error) => {
			const originalRequest = error.config;
			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				const refreshToken = localStorage.refreshToken;
				try {
					const response = await axios.get("/api/users/token", {
						headers: { "x-refresh-token": refreshToken },
					});
					const { access_token, refresh_token } = response.data;
					localStorage.setItem("jwtToken", access_token);
					localStorage.setItem("refreshToken", refresh_token);
					axios.defaults.headers.common["Authorization"] =
						"Bearer " + access_token;

					return axios(originalRequest);
				} catch (error) {
					store.dispatch(logoutUser());
					// Clear current profile
					store.dispatch(clearCurrentProfile());
					// Redirect to Login
					if (history) {
						history.push("/login");
					} else {
						window.location.href = "/login";
					}
					return Promise.reject(error);
				}
			}
			return Promise.reject(error);
		}
	);
};
export default setInterceptor;
