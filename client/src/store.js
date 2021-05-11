import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { errorSlice } from "./slices/errorSlice";
import { postSlice } from "./slices/postSlice";
import { profileSlice } from "./slices/profileSlice";

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		errors: errorSlice.reducer,
		profile: profileSlice.reducer,
		post: postSlice.reducer,
	},
});

export default store;
