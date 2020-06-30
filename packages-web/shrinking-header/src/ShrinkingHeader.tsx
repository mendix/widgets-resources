import { createElement, ReactElement } from "react";

import { ShrinkingHeader as ShrinkingHeaderComponent } from "./components/ShrinkingHeader";
import { ShrinkingHeaderContainerProps } from "../typings/ShrinkingHeaderProps";

export default function ShrinkingHeader(props: ShrinkingHeaderContainerProps): ReactElement {
    const {
        name,
        tabIndex,
        style,
        class: className,
        headerContent,
        scrollableContent,
        shrinkThreshold,
        shrinkClass: shrinkClassName
    } = props;

    return (
        <ShrinkingHeaderComponent
            name={name}
            tabIndex={tabIndex}
            style={style}
            className={className}
            headerContent={headerContent}
            scrollableContent={scrollableContent}
            shrinkThreshold={shrinkThreshold}
            shrinkClassName={shrinkClassName}
        />
    );
}
