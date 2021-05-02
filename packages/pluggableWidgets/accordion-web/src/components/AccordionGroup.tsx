import { createElement, ReactElement, ReactNode, useCallback, useRef, useState } from "react";

export interface AccordionGroupProps {
    header: ReactNode;
    content: ReactNode;
    collapsible: boolean;
    collapsed?: boolean;
}

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { header, content, collapsible, collapsed } = props;

    const previousCollapsedPropValue = useRef(collapsed);

    // The collapsible prop is never going to change afterwards, so the state doesn't need to be updated at a later stage based on this prop.
    const [divCollapsed, setDivCollapsed] = useState(collapsible && (collapsed || collapsed === undefined));
    const [mountDivContent, setMountDivContent] = useState(!divCollapsed);

    if (collapsed !== previousCollapsedPropValue.current) {
        previousCollapsedPropValue.current = collapsed;
        if (!collapsed) {
            setMountDivContent(true);
        }
        setDivCollapsed(collapsible && (collapsed || collapsed === undefined));
    }

    const toggleContentVisibility = useCallback(() => {
        setMountDivContent(true);
        setDivCollapsed(prevState => !prevState);
    }, [setDivCollapsed, setMountDivContent]);

    return (
        <section>
            <header onClick={collapsible ? toggleContentVisibility : undefined}>{header}</header>
            <div style={{ display: divCollapsed ? "none" : undefined }}>{mountDivContent ? content : undefined}</div>
        </section>
    );
}
