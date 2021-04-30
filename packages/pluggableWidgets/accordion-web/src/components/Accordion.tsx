import { createElement, ReactElement, useMemo } from "react";

import AccordionGroup, { AccordionGroupProps } from "./AccordionGroup";

import { AccordionContainerProps } from "../../typings/AccordionProps";

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccordionGroupProps[];
}

export default function Accordion(props: AccordionProps): ReactElement | null {
    const { id, class: classNames, style, tabIndex, groups } = props;

    const renderedGroups = useMemo(() => {
        return groups.map((group, index) => (
            <AccordionGroup key={index} header={group.header} content={group.content} />
        ));
    }, [groups]);

    return (
        <div id={id} className={classNames} style={style} tabIndex={tabIndex}>
            {renderedGroups}
        </div>
    );
}
