import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useState } from "react";

export interface AccordionGroupProps {
    header: ReactNode;
    content: ReactNode;
    collapsible: boolean;
}

// collapsible false -> always show all content, not clickable
// collapsible true + single --> start all closed, allow only one open
// collapsible true + multiple --> start all closed, allow multiple open

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { header, content, collapsible } = props;

    // The collapsible prop is never going to change afterwards, so the state doesn't need to be updated at a later stage based on this prop.
    const [divInlineStyle, setDivInlineStyle] = useState<CSSProperties>({ display: collapsible ? "none" : undefined });
    const [mountContent, setMountContent] = useState(!collapsible);

    const toggleContentVisibility = useCallback(() => {
        setMountContent(true);
        setDivInlineStyle(prevState => ({ display: prevState.display ? undefined : "none" }));
    }, [setDivInlineStyle, setMountContent]);

    return (
        <section>
            <header onClick={collapsible ? toggleContentVisibility : undefined}>{header}</header>
            <div style={divInlineStyle}>{mountContent ? content : undefined}</div>
        </section>
    );
}
