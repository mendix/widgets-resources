import { createElement, MutableRefObject, ReactNode, useCallback, useEffect, useRef } from "react";

import { ValueStatus } from "mendix";

import { AccessibilityHelperContainerProps, AttributesListType } from "../typings/AccessibilityHelperProps";

const PROHIBITED_ATTRIBUTES = ["class", "style", "widgetid", "data-mendix-id"];

function isValid(selector: string): boolean {
    if (PROHIBITED_ATTRIBUTES.indexOf(selector) !== -1) {
        console.error(`Widget tries to change ${selector} attribute, this is prohibited`);
        return false;
    }
    return true;
}

const AccessibilityHelper = (props: AccessibilityHelperContainerProps): ReactNode => {
    const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const attributeValuesRef: MutableRefObject<string[]> = useRef([]);
    const attributeConditionsRef: MutableRefObject<boolean[]> = useRef([]);

    const update = useCallback(() => {
        if (contentRef.current) {
            let target: Element | null = null;
            try {
                target = contentRef.current.querySelector(props.targetSelector);
                if (target) {
                    props.attributesList.forEach((attrEntry, index: number) => {
                        const valueToBeSet =
                            attrEntry.valueSourceType === "expression"
                                ? attrEntry.valueExpression
                                : attrEntry.valueText;
                        if (
                            attrEntry.attributeCondition.status === ValueStatus.Available &&
                            valueToBeSet?.status === ValueStatus.Available
                        ) {
                            if (
                                attrEntry.attributeCondition.value &&
                                valueToBeSet?.value !== target!.getAttribute(props.attribute)
                            ) {
                                attributeValuesRef.current?.splice(index, 0, valueToBeSet?.value);
                                attributeConditionsRef.current?.splice(index, 0, true);
                                target!.setAttribute(attrEntry.attribute, valueToBeSet?.value);
                            } else {
                                attributeValuesRef.current?.splice(index, 1);
                                attributeConditionsRef.current?.splice(index, 1);
                                target!.removeAttribute(attrEntry.attribute);
                            }
                        }
                    });
                }
            } catch (error) {
                console.error(`Set Attribute Target sector ${props.targetSelector} is not valid`, error);
            }
        }
    }, [
        props.targetSelector,
        props.attributesList,
        attributeValuesRef.current,
        attributeConditionsRef.current,
        contentRef.current
    ]);

    useEffect(() => {
        if (!isValid(props.targetSelector)) {
            return;
        }
        const isAnythingChanged = props.attributesList.every(attrEntry => {
            const valueToBeSet =
                attrEntry.valueSourceType === "expression" ? attrEntry.valueExpression : attrEntry.valueText;
            return (
                (valueToBeSet && !attributeValuesRef.current?.some(value => value === valueToBeSet.value)) ||
                (attrEntry.attributeCondition.value &&
                    !attributeConditionsRef.current?.some(
                        condition => condition === attrEntry.attributeCondition.value
                    ))
            );
        });
        if (isAnythingChanged) {
            update();
        }
    }, [props.attributesList, attributeValuesRef.current, attributeConditionsRef.current]);

    useEffect(() => {
        const contentWrapperNode = contentRef.current;

        if (contentWrapperNode) {
            const config: MutationObserverInit = {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: [props.attribute]
            };
            const observer = new MutationObserver(mutationList => {
                const doUpdate = props.attributesList.some((attrEntries: AttributesListType, index: number) =>
                    mutationList.some(
                        mutation =>
                            !(
                                mutation.type === "attributes" &&
                                mutation.attributeName === attrEntries.attribute &&
                                (mutation.target as Element).getAttribute(mutation.attributeName) ===
                                    attributeValuesRef.current[index]
                            )
                    )
                );

                if (doUpdate) {
                    update();
                }
            });
            observer.observe(contentWrapperNode, config);

            return () => {
                attributeValuesRef.current = [];
                attributeConditionsRef.current = [];
                observer.disconnect();
            };
        }
    }, [props.attributesList, attributeValuesRef.current, attributeConditionsRef.current, contentRef.current]);

    return <div ref={contentRef}>{props.content}</div>;
};

export default AccessibilityHelper;
