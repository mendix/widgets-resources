import { createElement, Dispatch, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { AccordionGroupsReducerAction } from "../utils/AccordionGroupStateReducer";

export interface AccGroup {
    header: ReactNode;
    content: ReactNode;
    collapsed?: boolean;
    visible: boolean;
}

export interface AccordionGroupProps {
    group: AccGroup;
    accordionGroupsDispatch?: Dispatch<AccordionGroupsReducerAction>;
}

export default function AccordionGroup(props: AccordionGroupProps): ReactElement | null {
    const { group, accordionGroupsDispatch } = props;

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
            accordionGroupsDispatch!({ type: "expand", group });
        } else {
            accordionGroupsDispatch!({ type: "collapse", group });
        }
    }, [group, accordionGroupsDispatch]);

    if (!group.visible) {
        return null;
    }

    return (
        <section>
            <header onClick={accordionGroupsDispatch ? toggleContentVisibility : undefined}>{group.header}</header>
            <div style={{ display: accordionGroupsDispatch && group.collapsed ? "none" : undefined }}>
                {divContentMounted ? group.content : undefined}
            </div>
        </section>
    );
}
