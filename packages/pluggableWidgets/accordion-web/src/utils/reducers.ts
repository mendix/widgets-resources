export type CollapsedAccordionGroupsReducerAction = { type: "expand" | "collapse"; index: number };

export function getCollapsedAccordionGroupsReducer(
    expandMode: "single" | "multiple"
): (state: boolean[], action: CollapsedAccordionGroupsReducerAction) => boolean[] {
    return (state: boolean[], action: CollapsedAccordionGroupsReducerAction): boolean[] => {
        if (action.type === "expand" && expandMode === "single") {
            return state.map((_element, index) => index !== action.index);
        }

        const newState = [...state];
        newState[action.index] = action.type === "collapse";
        return newState;
    };
}
