import { RFState } from "../types/rfState"

export const setUserName = (get: any, set: any) => (userName: string) => {
    set((state: RFState) => ({
        flow: {
            ...state.flow,
            createdBy: userName,
            lastAmendedBy: userName
        }
    }))
}