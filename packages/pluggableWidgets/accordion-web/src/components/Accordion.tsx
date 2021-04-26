import { createElement, ReactElement, ReactNode, useMemo } from "react";

import { AccordionContainerProps } from "../../typings/AccordionProps";

interface AccordionGroup {
    header: ReactNode;
    content: ReactNode;
}

export interface AccordionProps extends Pick<AccordionContainerProps, "class" | "style" | "tabIndex"> {
    groups: AccordionGroup[];
}

export default function Accordion(props: AccordionProps): ReactElement | null {
    const { class: classNames, groups, style, tabIndex } = props;

    const renderedGroups = useMemo(() => {
        return groups.map((group, index) => (
            <section key={index}>
                <header>{group.header}</header>
                <div>{group.content}</div>
            </section>
        ));
    }, [groups]);

    return (
        <div className={classNames} style={style} tabIndex={tabIndex}>
            {renderedGroups}
        </div>
    );
}
