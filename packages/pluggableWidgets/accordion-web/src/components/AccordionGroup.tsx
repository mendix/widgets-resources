import { createElement, ReactElement, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AccordionGroupsDispatch } from "./Accordion";

export interface AccGroup {
    header: ReactNode;
    content: ReactNode;
    collapsed?: boolean;
    visible: boolean;
}

export interface AccordionGroupProps {
    group: AccGroup;
    collapsible: boolean;
}

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { group, collapsible } = props;

    const dispatch = useContext(AccordionGroupsDispatch);
    const previousVisiblePropValue = useRef(group.visible);

    const [divContentMounted, setDivContentMounted] = useState(group.visible && !group.collapsed);

    useEffect(() => {
        if (group.visible !== previousVisiblePropValue.current || !group.collapsed) {
            previousVisiblePropValue.current = group.visible;
            setDivContentMounted(group.visible && !group.collapsed);
        }
    }, [group, setDivContentMounted]);

    const toggleContentVisibility = useCallback(() => {
        if (group.collapsed) {
            dispatch!({ type: "expand", group });
        } else {
            dispatch!({ type: "collapse", group });
        }
    }, [group, dispatch]);

    if (!group.visible) {
        return null;
    }

    return (
        <section>
            <header onClick={collapsible ? toggleContentVisibility : undefined}>{group.header}</header>
            <div style={{ display: group.collapsed ? "none" : undefined }}>
                {divContentMounted ? group.content : undefined}
            </div>
        </section>
    );
}
