export const setTooltipText = (get: any, set: any) => (text: string) => {
    set((state: any) => (
        {
            tooltip: {
                ...state.tooltip, text: text
            }
        }
    ))
}

