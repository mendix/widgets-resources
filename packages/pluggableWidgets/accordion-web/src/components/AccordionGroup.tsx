import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useState } from "react";

export interface AccordionGroupProps {
    header: ReactNode;
    content: ReactNode;
}

// collapsible false -> always show all content, not clickable
// collapsible true + single --> start all closed, allow only one open
// collapsible true + multiple --> start all closed, allow multiple open

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { header, content } = props;

    const [divInlineStyle, setDivInlineStyle] = useState<CSSProperties>({ display: "none" });
    const [mountContent, setMountContent] = useState(false);

    const toggleContentVisibility = useCallback(() => {
        setMountContent(true);
        setDivInlineStyle(prevState => ({ display: prevState.display ? undefined : "none" }));
    }, [setDivInlineStyle, setMountContent]);

    return (
        <section>
            <header onClick={toggleContentVisibility}>{header}</header>
            <div style={divInlineStyle}>{mountContent ? content : undefined}</div>
        </section>
    );
}
