import { createElement, ReactElement, useCallback, useMemo, useRef, useState } from "react";

import AccordionGroup, { AccGroup } from "./AccordionGroup";

import { AccordionContainerProps } from "../../typings/AccordionProps";

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccGroup[];
    collapsible: boolean;
}

export default function Accordion(props: AccordionProps): ReactElement | null {
    const { id, class: classNames, style, tabIndex, groups, collapsible } = props;

    const previousGroupsPropValue = useRef(groups);

    const [accordionGroups, setAccordionGroups] = useState<AccGroup[]>(() =>
        groups.map(group => ({ ...group, collapsed: true }))
    );

    if (groups !== previousGroupsPropValue.current) {
        previousGroupsPropValue.current = groups;
        setAccordionGroups(groups.map(group => ({ ...group, collapsed: true })));
    }

    const updateAccordionGroupCollapsedStates = useCallback(
        (expandedGroup: AccGroup) => {
            return () => {
                const newAccordionGroupStates = accordionGroups.map(group => ({
                    ...group,
                    collapsed: group !== expandedGroup
                }));
                setAccordionGroups(newAccordionGroupStates);
            };
        },
        [accordionGroups, setAccordionGroups]
    );

    const renderedGroups = useMemo(() => {
        return accordionGroups.map((group, index) => (
            <AccordionGroup
                key={index}
                header={group.header}
                content={group.content}
                collapsed={group.collapsed}
                collapsible={collapsible}
                onExpand={updateAccordionGroupCollapsedStates(group)}
            />
        ));
    }, [accordionGroups, collapsible, updateAccordionGroupCollapsedStates]);

    return (
        <div id={id} className={classNames} style={style} tabIndex={tabIndex}>
            {renderedGroups}
        </div>
    );
}
