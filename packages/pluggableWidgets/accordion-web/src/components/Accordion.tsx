import { createContext, createElement, Dispatch, ReactElement, useMemo, useReducer, useRef } from "react";

import AccordionGroup, { AccGroup } from "./AccordionGroup";

import { AccordionContainerProps } from "../../typings/AccordionProps";

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccGroup[];
    collapsible: boolean;
}

type AccordionGroupsReducerAction =
    | { type: "sync"; groups: AccGroup[] }
    | { type: "expand" | "collapse"; accordionGroup: AccGroup };

function accordionGroupsReducer(state: AccGroup[], action: AccordionGroupsReducerAction): AccGroup[] {
    const baseState = action.type === "sync" ? action.groups : state;

    return baseState.map((group, index) => {
        let collapsed;

        if (action.type === "sync") {
            collapsed = state[index].collapsed; // The previous collapsed state of the group at the same index can be used, because the order of groups remains the same throughout the lifetime of the widget.
        } else {
            collapsed = action.type === "expand" ? group !== action.accordionGroup : true;
        }

        return {
            ...group,
            collapsed
        };
    });
}

export const AccordionGroupsDispatch = createContext<Dispatch<AccordionGroupsReducerAction> | undefined>(undefined);

export default function Accordion(props: AccordionProps): ReactElement | null {
    const { id, class: classNames, style, tabIndex, groups, collapsible } = props;

    const previousGroupsPropValue = useRef(groups);

    const [accordionGroups, accordionGroupsDispatch] = useReducer(
        accordionGroupsReducer,
        groups.map(group => ({ ...group, collapsed: true }))
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
