import { createElement, ReactElement, useCallback, useMemo } from "react";
import { ValueStatus } from "mendix";

import { Icon } from "./components/Icon";
import AccordionComponent, { AccordionGroups } from "./components/Accordion";

import { AccordionContainerProps } from "../typings/AccordionProps";

export function Accordion(props: AccordionContainerProps): ReactElement | null {
    const accordionGroups: AccordionGroups | undefined = useMemo(() => {
        if (props.groups.some(group => group.visible.value === undefined || group.headerText.value === undefined)) {
            return undefined;
        }

        return props.groups.map(group => ({
            header: group.headerRenderMode === "text" ? <h3>{group.headerText.value}</h3> : group.headerContent,
            content: group.content,
            visible: group.visible.value!,
            dynamicClassName: group.dynamicClass?.value
        }));
    }, [props.groups]);

    const generateIcon = useIconGenerator(
        props.advancedMode,
        props.animateIcon,
        props.icon,
        props.expandIcon,
        props.collapseIcon
    );

    if (!accordionGroups) {
        return null;
    }

    return (
        <AccordionComponent
            id={props.name}
            class={props.class}
            style={props.style}
            tabIndex={props.tabIndex}
            groups={accordionGroups}
            collapsible={props.collapsible}
            animateCollapsing={props.animate}
            singleExpandedGroup={props.collapsible ? props.collapseBehavior === "singleExpanded" : undefined}
            generateHeaderIcon={generateIcon}
            showGroupHeaderIcon={props.showIcon}
        />
    );
}

function useIconGenerator(
    advancedMode: AccordionContainerProps["advancedMode"],
    animateIcon: AccordionContainerProps["animateIcon"],
    icon: AccordionContainerProps["icon"],
    expandIcon: AccordionContainerProps["expandIcon"],
    collapseIcon: AccordionContainerProps["collapseIcon"]
): (collapsed: boolean) => ReactElement {
    return useCallback(
        (collapsed: boolean): ReactElement => {
            if (!advancedMode) {
                return <Icon animate={animateIcon} />;
            } else {
                if (animateIcon) {
                    return (
                        <Icon data={icon?.value} loading={icon?.status === ValueStatus.Loading} animate={animateIcon} />
                    );
                } else {
                    return collapsed ? (
                        <Icon
                            data={expandIcon?.value}
                            loading={expandIcon?.status === ValueStatus.Loading}
                            animate={animateIcon}
                        />
                    ) : (
                        <Icon
                            data={collapseIcon?.value}
                            loading={collapseIcon?.status === ValueStatus.Loading}
                            animate={animateIcon}
                        />
                    );
                }
            }
        },
        [advancedMode, animateIcon, icon, expandIcon, collapseIcon]
    );
}
