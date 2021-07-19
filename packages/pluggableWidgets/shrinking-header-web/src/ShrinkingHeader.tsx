import { createElement, ReactElement } from "react";

import { ShrinkingHeaderThreshold } from "./components/ShrinkingHeaderThreshold";
import { ShrinkingHeaderLinear } from "./components/ShrinkingHeaderLinear";

import { ShrinkingHeaderContainerProps } from "../typings/ShrinkingHeaderProps";

export default function ShrinkingHeader(props: ShrinkingHeaderContainerProps): ReactElement | null {
    const { threshold, shrinkThreshold, initHeight, shrunkHeight, ...commonProps } = props;

    const actualShrinkThreshold = shrinkThreshold.value ? Number(shrinkThreshold.value.toString()) : undefined;

    if (!actualShrinkThreshold) {
        return null;
    }

    if (threshold) {
        return (
            <ShrinkingHeaderThreshold
                {...commonProps}
                className={commonProps.class}
                shrinkThreshold={actualShrinkThreshold}
            />
        );
    }

    return (
        <ShrinkingHeaderLinear
            {...commonProps}
            className={commonProps.class}
            initHeight={initHeight}
            shrunkHeight={shrunkHeight}
        />
    );
}
