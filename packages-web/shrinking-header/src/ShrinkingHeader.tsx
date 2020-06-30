import { createElement, ReactElement } from "react";

import { ShrinkingHeader as ShrinkingHeaderComponent } from "./components/ShrinkingHeader";
import { ShrinkingHeaderContainerProps } from "../typings/ShrinkingHeaderProps";

export default function ShrinkingHeader(props: ShrinkingHeaderContainerProps): ReactElement {
    const {
        content,
        name,
        tabIndex,
        style,
        class: className,
        shrinkThreshold,
        shrinkClass: shrinkClassName,
        scrollElementXPath
    } = props;

    return (
        <ShrinkingHeaderComponent
            name={name}
            tabIndex={tabIndex}
            style={style}
            className={className}
            shrinkThreshold={shrinkThreshold}
            shrinkClassName={shrinkClassName}
            scrollElementXPath={scrollElementXPath}
        >
            {content}
        </ShrinkingHeaderComponent>
    );
}
