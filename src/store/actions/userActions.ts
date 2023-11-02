import { RFState } from "../types/rfState"

export const setUserName = (get: () => RFState, set: any) => (userName: string) => {
    set((state: RFState) => ({
        flow: {
            ...state.flowSlice,
            createdBy: userName,
            lastAmendedBy: userName
        }
    }))
}