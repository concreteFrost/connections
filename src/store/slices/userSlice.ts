import { getUserSettingsData, initialSettings } from "../actions/storageActions";
import topMenuActions from "../actions/topViewActions";
import { RFState } from "../types/rfState";

export type UserSlice = {
    isLoggedIn: boolean,
    setIsLoggedIn: (loggedIn: boolean) => void;
};

const userSlice = (get: () => RFState, set: any): UserSlice => ({
    isLoggedIn: false,
    setIsLoggedIn: (loggedIn: boolean) => {
        console.log(loggedIn)
        set((state: RFState) => ({

            userSlice: {
                ...state.userSlice,
                isLoggedIn: loggedIn
            }

        }))

        console.log(get().userSlice.isLoggedIn)
    }

})

export default userSlice;