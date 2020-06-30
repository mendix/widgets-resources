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
        mainContent,
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
            mainContent={mainContent}
            shrinkThreshold={shrinkThreshold}
            shrinkClassName={shrinkClassName}
        />
    );
}
