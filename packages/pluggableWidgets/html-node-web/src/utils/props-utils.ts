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

export function createEventResolver(
    item?: ObjectItem
): (event: EventsType) => [string, (e: SyntheticEvent<Element>) => void] {
    return event => {
        const name = event.eventName;
        const cb = (e: SyntheticEvent<Element>): void => {
            if (event.eventPreventDefault) {
                e.preventDefault();
            }
            if (event.eventStopPropagation) {
                e.stopPropagation();
            }

            const action = item ? event.eventActionRepeat?.get(item) : event.eventAction;

            if (action && action.canExecute) {
                action.execute();
            }
        };

        return [name, cb];
    };
}

export function prepareEvents<T>(
    eventResolver: (event: T) => [string, (e: SyntheticEvent<Element>) => void],
    events: T[]
): DOMAttributes<Element> {
    return Object.fromEntries(events.map(evt => eventResolver(evt)));
}

export function createAttributeResolver(item?: ObjectItem): (a: AttributesType) => [name: string, value: string] {
    return (a: AttributesType) => {
        const name = a.attributeName;
        let value;
        if (item) {
            value = (
                a.attributeValueType === "template" ? a.attributeValueTemplateRepeat : a.attributeValueExpressionRepeat
            )?.get(item).value;
        } else {
            value = (a.attributeValueType === "template" ? a.attributeValueTemplate : a.attributeValueExpression)
                ?.value;
        }

        return [name, value ?? ""];
    };
}

export function prepareAttributes<T>(
    attrResolver: (a: T) => [name: string, value: string],
    attrs: T[],
    cls: string,
    style?: CSSProperties
): HTMLAttributes<Element> {
    const result: HTMLAttributes<Element> = Object.fromEntries(
        attrs.map(a => {
            const [name, value] = attrResolver(a);

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

export function prepareChildren(
    props: Pick<HTMLNodeContainerProps, "tagContentMode" | "tagContentContainer" | "tagContentRepeatContainer">,
    item?: ObjectItem
): ReactNode | undefined {
    if (props.tagContentMode !== "container") {
        return;
    }

    if (!item) {
        return props.tagContentContainer;
    }

    return props.tagContentRepeatContainer?.get(item);
}
