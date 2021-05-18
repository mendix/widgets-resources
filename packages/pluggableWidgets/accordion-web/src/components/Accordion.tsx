import { createContext, createElement, Dispatch, ReactElement, useReducer, useRef } from "react";

import AccordionGroup, { AccGroup } from "./AccordionGroup";
import { AccordionGroupsReducerAction, getAccordionGroupsReducer } from "../utils/AccordionGroupStateReducer";
import { AccordionContainerProps } from "../../typings/AccordionProps";

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccGroup[];
    collapsible: boolean;
    singleExpandedGroup?: boolean;
}

export const AccordionGroupsDispatch = createContext<Dispatch<AccordionGroupsReducerAction> | undefined>(undefined);

export default function Accordion(props: AccordionProps): ReactElement | null {
    const previousGroupsPropValue = useRef(props.groups);

    const [accordionGroups, accordionGroupsDispatch] = useReducer(
        getAccordionGroupsReducer(props.collapsible ? (props.singleExpandedGroup ? "single" : "multiple") : "all"), // the accordion group reducer function doesn't need to change during the lifetime of this component, since the singleExpandedGroup won't change.
        props.groups.map(group => ({ ...group, collapsed: props.collapsible }))
    );

    if (props.groups !== previousGroupsPropValue.current) {
        previousGroupsPropValue.current = props.groups;
        accordionGroupsDispatch({ type: "sync", groups: props.groups });
    }

    return (
        <AccordionGroupsDispatch.Provider value={props.collapsible ? accordionGroupsDispatch : undefined}>
            <div id={props.id} className={props.class} style={props.style} tabIndex={props.tabIndex}>
                {renderAccordionGroups(accordionGroups)}
            </div>
        </AccordionGroupsDispatch.Provider>
    );
}

function renderAccordionGroups(accordionGroups: AccGroup[]): ReactElement[] {
    return accordionGroups.map((group, index) => <AccordionGroup key={index} group={group} />);
}
