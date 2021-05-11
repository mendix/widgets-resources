import { createContext, createElement, Dispatch, ReactElement, useMemo, useReducer, useRef } from "react";

import AccordionGroup, { AccGroup } from "./AccordionGroup";

import { AccordionContainerProps } from "../../typings/AccordionProps";

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccGroup[];
    collapsible: boolean;
    singleExpandedGroup?: boolean;
}

type AccordionGroupsReducerAction =
    | { type: "sync"; groups: AccGroup[] }
    | { type: "expand" | "collapse"; group: AccGroup };

function getAccordionGroupsReducer(
    singleExpandedGroup?: boolean
): (state: AccGroup[], action: AccordionGroupsReducerAction) => AccGroup[] {
    return (state: AccGroup[], action: AccordionGroupsReducerAction): AccGroup[] => {
        if (singleExpandedGroup === undefined && action.type !== "sync") {
            return state;
        }

        if (action.type === "sync" || singleExpandedGroup) {
            const newState = action.type === "sync" ? action.groups : state;

            return newState.map((group, index) => {
                let collapsed;

                if (action.type === "sync") {
                    collapsed = state[index].collapsed; // The previous collapsed state of the group at the same index can be used, because the order of groups remains the same throughout the lifetime of the widget.
                } else {
                    collapsed = action.type === "expand" ? group !== action.group : true;
                }

                return {
                    ...group,
                    collapsed
                };
            });
        }

        const newState = [...state];
        const groupIndex = newState.findIndex(group => group === action.group);

        if (action.type === "expand") {
            newState[groupIndex] = { ...action.group, collapsed: false };
            return newState;
        }

        newState[groupIndex] = { ...action.group, collapsed: true };
        return newState;
    };
}

export const AccordionGroupsDispatch = createContext<Dispatch<AccordionGroupsReducerAction> | undefined>(undefined);

export default function Accordion(props: AccordionProps): ReactElement | null {
    const { id, class: classNames, style, tabIndex, groups, collapsible, singleExpandedGroup } = props;

    const previousGroupsPropValue = useRef(groups);

    const [accordionGroups, accordionGroupsDispatch] = useReducer(
        getAccordionGroupsReducer(singleExpandedGroup), // the accordion group reducer function doesn't need to change during the lifetime of this component, since the singleExpandedGroup won't change.
        groups.map(group => (collapsible ? { ...group, collapsed: true } : { ...group, collapsed: false }))
    );

    if (groups !== previousGroupsPropValue.current) {
        previousGroupsPropValue.current = groups;
        accordionGroupsDispatch({ type: "sync", groups });
    }

    const renderedGroups = useMemo(() => {
        return accordionGroups.map((group, index) => (
            <AccordionGroup key={index} group={group} collapsible={collapsible} />
        ));
    }, [accordionGroups, collapsible]);

    return (
        <AccordionGroupsDispatch.Provider value={accordionGroupsDispatch}>
            <div id={id} className={classNames} style={style} tabIndex={tabIndex}>
                {renderedGroups}
            </div>
        </AccordionGroupsDispatch.Provider>
    );
}
