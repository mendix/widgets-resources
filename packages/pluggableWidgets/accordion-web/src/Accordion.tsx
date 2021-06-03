import { createElement, ReactElement, useMemo } from "react";

import AccordionComponent from "./components/Accordion";

import { AccordionContainerProps } from "../typings/AccordionProps";
import { AccGroup } from "./components/AccordionGroup";

export function Accordion(props: AccordionContainerProps): ReactElement | null {
    const accordionGroups: AccGroup[] | undefined = useMemo(() => {
        if (props.groups.some(group => group.visible.value === undefined || group.headerText.value === undefined)) {
            return undefined;
        }

        return props.groups.map(group => ({
            header: group.headerRenderMode === "text" ? <h3>{group.headerText.value}</h3> : group.headerContent,
            content: group.content,
            visible: group.visible.value!,
            dynamicClassName: group.dynamicClass?.value
        }));
    }, [props.groups]);

    if (!accordionGroups) {
        return null;
    }

    return (
        <AccordionComponent
            id={props.name}
            class={props.class}
            style={props.style}
            tabIndex={props.tabIndex}
            groups={accordionGroups}
            collapsible={props.collapsible}
            singleExpandedGroup={props.collapsible ? props.collapseBehavior === "singleExpanded" : undefined}
            showGroupHeaderIcon={props.showIcon}
            animateGroupHeaderIcon={props.animateIcon}
        />
    );
}
