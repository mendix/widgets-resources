import { createElement, MutableRefObject, ReactElement, useCallback, useEffect, useRef, useMemo } from "react";

import { ValueStatus, DynamicValue } from "mendix";

import { AccessibilityHelperContainerProps } from "../typings/AccessibilityHelperProps";

const AccessibilityHelper = (props: AccessibilityHelperContainerProps): ReactElement => {
    const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const conditions = useMemo(
        () => props.attributesList.map(attr => ({ attribute: attr.attribute, condition: attr.attributeCondition })),
        [props.attributesList]
    );

    const getValueBySourceType = useCallback(
        (attribute: string): DynamicValue<string> | undefined => {
            const attrEntry = props.attributesList.find(entry => entry.attribute === attribute);
            return attrEntry?.valueSourceType === "expression" ? attrEntry?.valueExpression : attrEntry?.valueText;
        },
        [props.attributesList]
    );

    const update = useCallback(() => {
        try {
            const targets = contentRef.current?.querySelectorAll(props.targetSelector);
            if (targets && targets.length > 0) {
                targets.forEach(target => {
                    conditions.forEach(attrEntry => {
                        const valueToBeSet = getValueBySourceType(attrEntry.attribute);

                        if (attrEntry.condition.status === ValueStatus.Available && attrEntry.condition.value) {
                            if (
                                valueToBeSet?.status === ValueStatus.Available &&
                                valueToBeSet?.value !== target.getAttribute(attrEntry.attribute)
                            ) {
                                target.setAttribute(attrEntry.attribute, valueToBeSet?.value);
                            }
                        } else if (attrEntry.condition.status === ValueStatus.Available && !attrEntry.condition.value) {
                            target.removeAttribute(attrEntry.attribute);
                        }
                    });
                });
            }
        } catch (error) {
            console.error(`Accessibility Helper selector ${props.targetSelector} is not valid`, error);
        }
    }, [props.targetSelector, conditions, contentRef.current]);

    useEffect(() => {
        const contentWrapper = contentRef.current;
        if (contentWrapper) {
            const mutationConfig: MutationObserverInit = {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: conditions.map(condition => condition.attribute)
            };

            // Mutation observer is needed because if props.content is shown/hidden via conditional visibility
            // we don't get re-renders in the widget itself, thus we need to observe the dom, to see if any attributes
            // are changed

            const isAnyLoading = conditions.some(condition => condition.condition.status === ValueStatus.Loading);

            if (!isAnyLoading) {
                update();

                const observer = new MutationObserver(mutationList => {
                    const doUpdate = conditions.some(condition =>
                        mutationList.some(
                            mutation =>
                                !(
                                    mutation.type === "attributes" &&
                                    mutation.attributeName === condition.attribute &&
                                    (mutation.target as Element).getAttribute(mutation.attributeName) ===
                                        getValueBySourceType(condition.attribute)?.value
                                )
                        )
                    );

                    if (doUpdate) {
                        update();
                    }
                });

                observer.observe(contentWrapper, mutationConfig);

                return () => {
                    observer.disconnect();
                };
            }
        }
    }, [contentRef.current, props.targetSelector, conditions]);

    return <div ref={contentRef}>{props.content}</div>;
};

export default AccessibilityHelper;
