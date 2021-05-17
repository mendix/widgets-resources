import { createContext, createElement, Dispatch, ReactElement, useMemo, useReducer, useRef } from "react";

import AccordionGroup, { AccGroup } from "./AccordionGroup";
import { AccordionGroupsReducerAction, getAccordionGroupsReducer } from "../utils/AccordionGroupStateReducer";
import { AccordionContainerProps } from "../../typings/AccordionProps";

interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccGroup[];
    collapsible: boolean;
    singleExpandedGroup?: boolean;
}

export const AccordionGroupsDispatch = createContext<Dispatch<AccordionGroupsReducerAction> | undefined>(undefined);

export default function Accordion(props: AccordionProps): ReactElement | null {
    const { id, class: classNames, style, tabIndex, groups, collapsible, singleExpandedGroup } = props;

    const previousGroupsPropValue = useRef(groups);

    const [accordionGroups, accordionGroupsDispatch] = useReducer(
        getAccordionGroupsReducer(collapsible ? (singleExpandedGroup ? "single" : "multiple") : "all"), // the accordion group reducer function doesn't need to change during the lifetime of this component, since the singleExpandedGroup won't change.
        groups.map(group => (collapsible ? { ...group, collapsed: true } : { ...group, collapsed: false }))
    );

    if (groups !== previousGroupsPropValue.current) {
        previousGroupsPropValue.current = groups;
        accordionGroupsDispatch({ type: "sync", groups });
    }

    const renderedGroups = useMemo(() => {
        return accordionGroups.map((group, index) => <AccordionGroup key={index} group={group} />);
    }, [accordionGroups]);

    return (
        <AccordionGroupsDispatch.Provider value={collapsible ? accordionGroupsDispatch : undefined}>
            <div id={id} className={classNames} style={style} tabIndex={tabIndex}>
                {renderedGroups}
            </div>
        </AccordionGroupsDispatch.Provider>
    );
}
