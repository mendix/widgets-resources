import { createElement, ReactElement, ReactNode, useMemo } from "react";

import AccordionComponent from "./components/Accordion";

import { AccordionContainerProps } from "../typings/AccordionProps";
import { AccGroup } from "./components/AccordionGroup";

export function Accordion(props: AccordionContainerProps): ReactElement | null {
    const { class: className, name, style, tabIndex, groups, collapsible } = props;

    const accordionGroups: AccGroup[] | undefined = useMemo(() => {
        const result = [];

        for (const group of groups) {
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

                header = <h3>{headerText}</h3>; // TODO: verify this is the desired heading element
            } else {
                header = group.headerContent;
            }

            result.push({ header, content: group.content, visible });
        }

        return result;
    }, [groups]);

    if (!accordionGroups) {
        return null;
    }

    return (
        <AccordionComponent
            id={name}
            class={className}
            style={style}
            tabIndex={tabIndex}
            groups={accordionGroups}
            collapsible={collapsible}
        />
    );
}
