import { createElement, ReactElement, useCallback } from "react";
import { ValueStatus } from "mendix";

import { Icon } from "../components/Icon";

import { AccordionContainerProps } from "../../typings/AccordionProps";

export function useIconGenerator(
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
