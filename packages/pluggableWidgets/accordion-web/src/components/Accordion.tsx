import { createElement, ReactElement, ReactNode, useMemo } from "react";

import { AccordionContainerProps } from "../../typings/AccordionProps";

interface AccordionGroup {
    header: ReactNode;
    content: ReactNode;
}

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    id: string;
    groups: AccordionGroup[];
}

export default function Accordion(props: AccordionProps): ReactElement | null {
    const { id, class: classNames, style, tabIndex, groups } = props;

    const renderedGroups = useMemo(() => {
        return groups.map((group, index) => (
            <section key={index}>
                <header>{group.header}</header>
                <div>{group.content}</div>
            </section>
        ));
    }, [groups]);

    return (
        <div id={id} className={classNames} style={style} tabIndex={tabIndex}>
            {renderedGroups}
        </div>
    );
}
