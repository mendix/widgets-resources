import { createElement, ReactElement, ReactNode, useMemo } from "react";

import AccordionComponent from "./components/Accordion";

import { AccordionContainerProps } from "../typings/AccordionProps";
import { AccGroup } from "./components/AccordionGroup";

export function Accordion(props: AccordionContainerProps): ReactElement | null {
    const accordionGroups: AccGroup[] | undefined = useMemo(() => {
        const result = [];

        for (const group of props.groups) {
            const visible = group.visible.value;

            if (visible === undefined) {
                return undefined;
            }

            let header: ReactNode;

            if (group.headerRenderMode === "text") {
                const headerText = group.headerText.value;

                if (headerText === undefined) {
                    return undefined;
                }

                header = <h3>{headerText}</h3>;
            } else {
                header = group.headerContent;
            }

            result.push({ header, content: group.content, visible });
        }

        return result;
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
        />
    );
}
