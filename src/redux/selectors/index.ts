import { RootState } from "../store";

export const userSelectors = (state: RootState) => state.users;
export const pathSelectors = (state: RootState) => state.path;
