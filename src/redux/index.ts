import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./slices/UserSlice";
import pathSlice from "./slices/PathSlice";
import deviceSlice from "./slices/DeviceSlice";
import serviceSlice from "./slices/ServiceSlice";
import numericalSlice from "./slices/NumberSlice";
import roleSlice from "./slices/RoleSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    paths: pathSlice.reducer,
    devices: deviceSlice.reducer,
    services: serviceSlice.reducer,
    numericalList: numericalSlice.reducer,
    role: roleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const userSelectors = (state: RootState) => state.users;
export const pathSelectors = (state: RootState) => state.paths;
export const deviceSelectors = (state: RootState) => state.devices;
export const serviceSelectors = (state: RootState) => state.services;
export const numericalSelectors = (state: RootState) => state.numericalList;
export const roleSelectors = (state: RootState) => state.role;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
