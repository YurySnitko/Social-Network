import { AppStateType } from "./reduxStore";

export const selectProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}
export const selectStatus = (state: AppStateType) => {
    return state.profilePage.status;
}

