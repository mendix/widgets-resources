import { createElement, ReactElement, useCallback, useEffect, useState } from "react";

import { ShrinkingHeaderThreshold } from "./components/ShrinkingHeaderThreshold";
import { ShrinkingHeaderLinear } from "./components/ShrinkingHeaderLinear";

import { ShrinkingHeaderContainerProps } from "../typings/ShrinkingHeaderProps";

export default function ShrinkingHeader(props: ShrinkingHeaderContainerProps): ReactElement | null {
    const {
        name,
        tabIndex,
        style,
        class: className,
        content,
        threshold,
        shrinkThreshold,
        initHeight,
        shrunkHeight
    } = props;

    const actualShrinkThreshold = shrinkThreshold.value ? Number(shrinkThreshold.value.toString()) : undefined;

    const [shrinkingHeaderThresholdElement, setShrinkingHeaderThresholdElement] = useState<HTMLDivElement>();

    const setShrinkingHeaderThreshold = useCallback(
        (node: HTMLDivElement | null) => {
            setShrinkingHeaderThresholdElement(node ?? undefined);
        },
        [setShrinkingHeaderThresholdElement]
    );

    /*
        Position "sticky" behaviour breaks when navigating from another page in the Mendix application.
        This is due to the css rule `overflow-x: hidden` which is applied to `div class="mx-placeholder" />`.
        This useEffect iterates through all ancestor elements and removes this rule, except for the body element.
     */
    useEffect(() => {
        if (shrinkingHeaderThresholdElement) {
            const removeOverflowRules = function (element: HTMLElement): void {
                if (element.tagName !== "body") {
                    element.style.overflow = "";
                }
                const parentElement = element.parentElement;
                if (parentElement) {
                    removeOverflowRules(parentElement);
                }
            };

            removeOverflowRules(shrinkingHeaderThresholdElement);
        }
    }, [shrinkingHeaderThresholdElement]);

    if (!actualShrinkThreshold) {
        return null;
    }

    if (threshold) {
        return (
            <ShrinkingHeaderThreshold
                rootElementRef={setShrinkingHeaderThreshold}
                name={name}
                tabIndex={tabIndex}
                style={style}
                className={className}
                content={content}
                shrinkThreshold={actualShrinkThreshold}
            />
        );
    }

    return (
        <ShrinkingHeaderLinear
            rootElementRef={setShrinkingHeaderThreshold}
            name={name}
            tabIndex={tabIndex}
            style={style}
            className={className}
            content={content}
            initHeight={initHeight}
            shrunkHeight={shrunkHeight}
        />
    );
}
