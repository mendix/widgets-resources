import { createElement, ReactElement, useCallback } from "react";

import { Icon, IconProps } from "../components/Icon";

import { AccordionContainerProps } from "../../typings/AccordionProps";

export function useIconGenerator(
    animateIcon: AccordionContainerProps["animateIcon"],
    icon: Omit<IconProps, "animate">,
    expandIcon: Omit<IconProps, "animate">,
    collapseIcon: Omit<IconProps, "animate">
): (collapsed: boolean) => ReactElement {
    return useCallback(
        (collapsed: boolean): ReactElement => {
            if (animateIcon) {
                return <Icon {...icon} animate={animateIcon} />;
            } else {
                return collapsed ? (
                    <Icon {...expandIcon} animate={animateIcon} />
                ) : (
                    <Icon {...collapseIcon} animate={animateIcon} />
                );
            }
        },
        [animateIcon, icon, expandIcon, collapseIcon]
    );
}
