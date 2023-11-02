import { RFState } from "../types/rfState"

export const setUserName = (get: () => RFState, set: any) => (userName: string) => {
    set((state: RFState) => ({
        flowSlice: {
            ...state.flowSlice,
            flow: {
                ...state.flowSlice.flow,
                createdBy: userName,
                lastAmendedBy: userName
            }

        }
    }))
}