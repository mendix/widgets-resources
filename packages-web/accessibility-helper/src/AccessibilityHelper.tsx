import { ReactNode, MutableRefObject, createElement, useRef, useEffect, useCallback } from "react";

import { DynamicValue, ValueStatus } from "mendix";

import { AccessibilityHelperContainerProps } from "../typings/AccessibilityHelperProps";

const PROHIBITED_ATTRIBUTES = ["class", "style", "widgetid", "data-mendix-id"];

const isValid = function isValid(selector: string): boolean {
    if (PROHIBITED_ATTRIBUTES.indexOf(selector) !== -1) {
        console.error(`Widget tries to change ${selector} attribute, this is prohibited`);
        return false;
    }
    return true;
};

const AccessibilityHelper = (props: AccessibilityHelperContainerProps): ReactNode => {
    // console.log("render accessibility-helper", props.valueExpression.status, props.valueExpression.value);
    const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const attributeValue: MutableRefObject<string | null> = useRef(null);
    const attributeCondition: MutableRefObject<boolean | null> = useRef(null);

    const value: MutableRefObject<DynamicValue<string> | undefined> = useRef(undefined);
    const condition: MutableRefObject<DynamicValue<boolean> | undefined> = useRef(undefined);
    condition.current = props.attributeCondition;
    value.current = props.valueSource === "expression" ? props.valueExpression : props.valueText;

    // console.log("render accessibility-helper", value.current.status, value.current.value);

    const update = useCallback(() => {
        // console.log("check updateContent", value.current.status, value.current.value);
        const containerElement = contentRef.current;
        if (containerElement) {
            // console.log("has current ref");
            let target = null;
            try {
                target = containerElement.querySelector(props.targetSelector);
            } catch (error) {
                console.error(`Set Attribute Target sector ${props.targetSelector} is not valid`, error);
            }
            if (!target) {
                console.debug(`Set Attribute Target ${props.targetSelector} does not exist or is not visible`);
                return;
            }
            // if (
            //     value.current.status === ValueStatus.Available &&
            //     target.getAttribute(props.attribute) === value.current.value
            // ) {
            //     console.log("not changed");
            // }
            if (condition.current?.status === ValueStatus.Available && condition.current?.value) {
                if (
                    value.current?.status === ValueStatus.Available &&
                    target.getAttribute(props.attribute) !== value.current?.value
                ) {
                    // console.log(`set attribute value: ${props.attribute}="${value.current?.value}"`);
                    attributeValue.current = value.current?.value;
                    attributeCondition.current = true;
                    target.setAttribute(props.attribute, value.current?.value);
                }
            } else if (condition.current?.status === ValueStatus.Available && !condition.current?.value) {
                // console.log("remove attribute", props.attribute);
                attributeValue.current = null;
                attributeCondition.current = false;
                target.removeAttribute(props.attribute);
            }
            // else {
            //     console.log("condition loading");
            // }
        }
    }, [props.targetSelector, props.attribute]);

    useEffect(() => {
        // console.log("useEffect, initial, no dep");
        if (!isValid(props.targetSelector)) {
            return;
        }
        if (
            (attributeValue.current !== value.current?.value &&
                value.current?.status === ValueStatus.Available &&
                condition.current?.value) ||
            (attributeCondition.current !== condition.current?.value &&
                condition.current?.status === ValueStatus.Available)
        ) {
            // console.log("value Changed");
            update();
        }
        // else {
        //     console.log("no change");
        // }
    }, [value.current, condition.current]);

    useEffect(() => {
        // console.log("useEffect, with dep");

        const contentWrapperNode = contentRef.current;
        if (contentWrapperNode && isValid(props.targetSelector)) {
            const config: MutationObserverInit = {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: [props.attribute]
            };
            const observer = new MutationObserver(mutationList => {
                const doUpdate = mutationList.some(
                    mutation =>
                        !(
                            mutation.type === "attributes" &&
                            mutation.attributeName === props.attribute &&
                            (mutation.target as Element).getAttribute(mutation.attributeName) === attributeValue.current
                        )
                );
                if (doUpdate) {
                    update();
                }
                // else {
                //     console.log("self update");
                // }
            });
            observer.observe(contentWrapperNode, config);
            console.log("observe changes");

            return () => {
                // console.log("disconnect");
                attributeValue.current = null;
                attributeCondition.current = null;
                observer.disconnect();
            };
        }
        // else {
        //     console.log("no ref found");
        // }
    }, [props.content, props.targetSelector, props.attribute]);

    return <div ref={contentRef}>{props.content}</div>;
};

export default AccessibilityHelper;
