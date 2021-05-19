import { createElement, Dispatch, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { AccordionGroupsReducerAction } from "../utils/AccordionGroupStateReducer";
import classNames from "classnames";

import "../ui/accordion-main.scss";

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
        <section
            className={classNames("widget-accordion-group", { "widget-accordion-group-collapsed": group.collapsed })}
        >
            <header
                className={classNames("widget-accordion-group-header", {
                    "widget-accordion-group-header-clickable": accordionGroupsDispatch
                })}
                onClick={accordionGroupsDispatch ? toggleContentVisibility : undefined}
            >
                {group.header}
            </header>
            <div className={"widget-accordion-group-content"}>{divContentMounted ? group.content : undefined}</div>
        </section>
    );
}
