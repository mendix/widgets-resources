import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useRef, useState } from "react";

export interface AccordionGroupProps {
    header: ReactNode;
    content: ReactNode;
    collapsible: boolean;
    collapsed?: boolean;
}

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { header, content, collapsible, collapsed } = props;

    const divCollapsed = useRef(collapsed);

    // The collapsible prop is never going to change afterwards, so the state doesn't need to be updated at a later stage based on this prop.
    const [divInlineStyle, setDivInlineStyle] = useState<CSSProperties>({
        display: collapsible && (divCollapsed.current || divCollapsed.current === undefined) ? "none" : undefined
    });
    const [mountContent, setMountContent] = useState(
        !(collapsible && (divCollapsed.current || divCollapsed.current === undefined))
    );

    const toggleContentVisibility = useCallback(() => {
        setMountContent(true);
        setDivInlineStyle(prevState => ({ display: prevState.display ? undefined : "none" }));
    }, [setDivInlineStyle, setMountContent]);

    if (collapsed !== divCollapsed.current) {
        divCollapsed.current = collapsed;
        setDivInlineStyle({
            display: collapsible && (divCollapsed.current || divCollapsed.current === undefined) ? "none" : undefined
        });
    }

    return (
        <section>
            <header onClick={collapsible ? toggleContentVisibility : undefined}>{header}</header>
            <div style={divInlineStyle}>{mountContent ? content : undefined}</div>
        </section>
    );
}
