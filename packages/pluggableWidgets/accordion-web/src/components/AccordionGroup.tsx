import { createElement, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";

export interface AccGroup {
    header: ReactNode;
    content: ReactNode;
    collapsed?: boolean;
    visible: boolean;
}

export interface AccordionGroupProps extends AccGroup {
    collapsible: boolean;
    expand: () => void;
    collapse: () => void;
}

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { header, content, collapsed, visible, collapsible, expand, collapse } = props;

    const previousVisiblePropValue = useRef(visible);

    const [divContentMounted, setDivContentMounted] = useState(visible && !collapsed);

    useEffect(() => {
        if (visible !== previousVisiblePropValue.current || !collapsed) {
            previousVisiblePropValue.current = visible;
            setDivContentMounted(visible && !collapsed);
        }
    }, [collapsed, visible, setDivContentMounted]);

    const toggleContentVisibility = useCallback(() => {
        if (collapsed) {
            expand();
        } else {
            collapse();
        }
    }, [collapsed, expand, collapse]);

    if (!visible) {
        return null;
    }

    return (
        <section>
            <header onClick={collapsible ? toggleContentVisibility : undefined}>{header}</header>
            <div style={{ display: collapsed ? "none" : undefined }}>{divContentMounted ? content : undefined}</div>
        </section>
    );
}
