import { createElement, ReactElement, ReactNode, useMemo } from "react";

import AccordionComponent from "./components/Accordion";

import { AccordionContainerProps } from "../typings/AccordionProps";

export function Accordion(props: AccordionContainerProps): ReactElement {
    const { class: className, name, style, tabIndex, groups } = props;

    const accordionGroups = useMemo(() => {
        return groups.map(group => {
            let header: ReactNode;

            if (group.headerRenderMode === "text") {
                header = <h3>{group.headerText.value}</h3>; // TODO: verify this is the desired heading element
            } else {
                header = group.headerContent;
            }

            return { header, content: group.content };
        });
    }, [groups]);

    return (
        <AccordionComponent id={name} class={className} style={style} tabIndex={tabIndex} groups={accordionGroups} />
    );
}
