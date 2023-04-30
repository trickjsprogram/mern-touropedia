import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";
import ProfileReducer from "./features/profileSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
    profile: ProfileReducer,
  },
});
