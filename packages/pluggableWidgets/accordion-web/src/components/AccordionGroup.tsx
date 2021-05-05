import { createElement, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";

export interface AccGroup {
    header: ReactNode;
    content: ReactNode;
    collapsed?: boolean;
    visible: boolean;
}

export interface AccordionGroupProps extends AccGroup {
    collapsible: boolean;
    onExpand?: () => void;
}

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { header, content, collapsed, visible, collapsible, onExpand } = props;

    const previousVisiblePropValue = useRef(visible);

    const [divCollapsed, setDivCollapsed] = useState(collapsible && (collapsed || collapsed === undefined));
    const [divContentMounted, setDivContentMounted] = useState(visible && !divCollapsed);

    useEffect(() => {
        setDivCollapsed(collapsible && (collapsed || collapsed === undefined));
    }, [collapsed, collapsible, setDivCollapsed]);

    useEffect(() => {
        if (visible !== previousVisiblePropValue.current) {
            previousVisiblePropValue.current = visible;
            setDivContentMounted(visible && !divCollapsed);
        }
    }, [visible, divCollapsed, setDivContentMounted]);

    const toggleContentVisibility = useCallback(() => {
        setDivContentMounted(true);
        setDivCollapsed(prevState => {
            const divCollapsed = !prevState;

            if (!divCollapsed) {
                onExpand?.(); // TODO call this one before we actually open this accordion group
            }

            return !prevState;
        });
    }, [onExpand, setDivCollapsed, setDivContentMounted]);

    if (!visible) {
        return null;
    }

    return (
        <section>
            <header onClick={collapsible ? toggleContentVisibility : undefined}>{header}</header>
            <div style={{ display: divCollapsed ? "none" : undefined }}>{divContentMounted ? content : undefined}</div>
        </section>
    );
}
