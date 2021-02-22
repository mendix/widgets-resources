import { createElement, ReactElement } from "react";

import { ShrinkingHeaderThreshold } from "./components/ShrinkingHeaderThreshold";

import { ShrinkingHeaderContainerProps } from "../typings/ShrinkingHeaderProps";

export default function ShrinkingHeader(props: ShrinkingHeaderContainerProps): ReactElement | null {
    const {
        name,
        tabIndex,
        style,
        class: className,
        headerContent,
        scrollableContent,
        shrinkThreshold,
        shrunkClassName
    } = props;

    const actualShrinkThreshold = shrinkThreshold.value ? Number(shrinkThreshold.value.toString()) : undefined;

    if (!actualShrinkThreshold) {
        return null;
    }

    return (
        <ShrinkingHeaderThreshold
            name={name}
            tabIndex={tabIndex}
            style={style}
            className={className}
            headerContent={headerContent}
            scrollableContent={scrollableContent}
            shrinkThreshold={actualShrinkThreshold}
            shrunkClassName={shrunkClassName}
        />
    );
}
