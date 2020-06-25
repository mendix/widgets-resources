import { createElement, MutableRefObject, ReactElement, useCallback, useEffect, useRef } from "react";

import { ValueStatus, DynamicValue } from "mendix";

import { AccessibilityHelperContainerProps, AttributesListType } from "../typings/AccessibilityHelperProps";

const PROHIBITED_ATTRIBUTES = ["class", "style", "widgetid", "data-mendix-id"];

const AccessibilityHelper = (props: AccessibilityHelperContainerProps): ReactElement => {
    const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    let observer;

    const update = useCallback(() => {
        if (contentRef.current) {
            try {
                const target = contentRef.current.querySelector(props.targetSelector);
                if (target) {
                    props.attributesList.forEach(attrEntry => {
                        const valueToBeSet = getValueBySourceType(attrEntry);
                        const condition = attrEntry.attributeCondition;

                        if (condition.status === ValueStatus.Available && condition.value) {
                            if (
                                valueToBeSet?.status === ValueStatus.Available &&
                                valueToBeSet?.value !== target.getAttribute(attrEntry.attribute)
                            ) {
                                target.setAttribute(attrEntry.attribute, valueToBeSet?.value);
                            }
                        } else if (condition.status === ValueStatus.Available && !condition.value) {
                            target.removeAttribute(attrEntry.attribute);
                        }
                    });
                }
            } catch (error) {
                console.error(`Accessibility Helper selector ${props.targetSelector} is not valid`, error);
            }
        }
    }, [props.targetSelector, props.attributesList]);

    useEffect(() => {
        if (!isValid(props.targetSelector)) {
            return;
        }
        update();
    }, [props.attributesList]);

    useEffect(() => {
        const contentWrapper = contentRef.current;
        if (contentWrapper && isValid(props.targetSelector)) {
            const mutationConfig: MutationObserverInit = {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: props.attributesList.map(attr => attr.attribute)
            };

            // Mutation observer is needed because if props.content is shown/hidden via conditional visibility
            // we don't get re-renders in the widget itself, thus we need to observe the dom, to see if any attributes
            // are changed
            observer = new MutationObserver(mutationList => {
                const doUpdate = props.attributesList.some((attrEntries: AttributesListType) =>
                    mutationList.some(
                        mutation =>
                            !(mutation.type === "attributes" && mutation.attributeName === attrEntries.attribute)
                    )
                );

                if (doUpdate) {
                    update();
                }
            });
            observer.observe(contentWrapper, mutationConfig);
        }
    }, [props.content, props.targetSelector, props.attributesList]);

    return <div ref={contentRef}>{props.content}</div>;
};

function isValid(selector: string): boolean {
    if (PROHIBITED_ATTRIBUTES.some(value => value === selector)) {
        console.error(`Widget tries to change ${selector} attribute, this is prohibited`);
        return false;
    }
    return true;
}

function getValueBySourceType(attrEntry: AttributesListType): DynamicValue<string> | undefined {
    return attrEntry.valueSourceType === "expression" ? attrEntry.valueExpression : attrEntry.valueText;
}

export default AccessibilityHelper;
