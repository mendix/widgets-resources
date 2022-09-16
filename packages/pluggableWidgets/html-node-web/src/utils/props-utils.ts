import { CSSProperties, DOMAttributes, HTMLAttributes, ReactNode, SyntheticEvent } from "react";
import { ObjectItem } from "mendix";

import { AttributesType, EventsType, HTMLNodeContainerProps, TagNameEnum } from "../../typings/HTMLNodeProps";
import { convertInlineCssToReactStyle } from "./style-utils";

export function prepareTag(tag: TagNameEnum, customTag: string): keyof JSX.IntrinsicElements {
    if (tag === "__customTag__") {
        return customTag as keyof JSX.IntrinsicElements;
    }

    return tag;
}

export function prepareEvents(events: EventsType[], item?: ObjectItem): DOMAttributes<Element> {
    return Object.fromEntries(
        events.map(evt => [
            evt.eventName,
            (e: SyntheticEvent<Element>) => {
                if (evt.eventPreventDefault) {
                    e.preventDefault();
                }
                if (evt.eventStopPropagation) {
                    e.stopPropagation();
                }

                const action = item ? evt.eventActionRepeat?.get(item) : evt.eventAction;

                if (action && action.canExecute) {
                    action.execute();
                }
            }
        ])
    );
}

function prepareAttributeValue(a: AttributesType, item?: ObjectItem): string | undefined {
    if (item) {
        return (
            a.attributeValueType === "template" ? a.attributeValueTemplateRepeat : a.attributeValueExpressionRepeat
        )?.get(item).value;
    } else {
        return (a.attributeValueType === "template" ? a.attributeValueTemplate : a.attributeValueExpression)?.value;
    }
}

export function prepareAttributes(
    attrs: AttributesType[],
    cls: string,
    style?: CSSProperties,
    item?: ObjectItem
): HTMLAttributes<Element> {
    const result: HTMLAttributes<Element> = Object.fromEntries(
        attrs.map(a => {
            const name = a.attributeName;
            const value = prepareAttributeValue(a, item) ?? "";

            switch (name) {
                case "style":
                    return ["style", convertInlineCssToReactStyle(value)];
                case "class":
                    return ["className", value];
                default:
                    return [name, value];
            }
        })
    );

    result.style = { ...style, ...result.style };
    result.className = `html-node-widget ${cls ?? ""} ${result.className ?? ""}`.trim();

    return result;
}

export function prepareHtml(
    props: Pick<HTMLNodeContainerProps, "tagContentMode" | "tagContentHTML" | "tagContentRepeatHTML">,
    item?: ObjectItem
): string | undefined {
    if (props.tagContentMode !== "innerHTML") {
        return;
    }

    if (!item) {
        return props.tagContentHTML?.value;
    }

    return props.tagContentRepeatHTML?.get(item).value;
}

export function prepareChildren(props: HTMLNodeContainerProps, item?: ObjectItem): ReactNode | undefined {
    if (props.tagContentMode !== "container") {
        return;
    }

    if (!item) {
        return props.tagContentContainer;
    }

    return props.tagContentRepeatContainer?.get(item);
}
