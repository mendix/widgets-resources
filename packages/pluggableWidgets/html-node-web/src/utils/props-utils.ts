import { CSSProperties, DOMAttributes, HTMLAttributes, SyntheticEvent } from "react";
import { ObjectItem } from "mendix";
import classNames from "classnames";

import { AttributesType, EventsType } from "../../typings/HTMLNodeProps";
import { convertInlineCssToReactStyle } from "./style-utils";

export function prepareEvents(events: EventsType[], item?: ObjectItem): DOMAttributes<Element> {
    return Object.fromEntries(
        events.map(evt => {
            return [
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
            ];
        })
    );
}

export function prepareAttributes(
    attrs: AttributesType[],
    cls: string,
    style?: CSSProperties,
    item?: ObjectItem
): HTMLAttributes<Element> {
    const attributes = attrs
        .map(a => {
            const name = a.attributeName;
            let value: string | undefined;
            if (item) {
                value = (
                    a.attributeValueType === "template"
                        ? a.attributeValueTemplateRepeat
                        : a.attributeValueExpressionRepeat
                )?.get(item).value;
            } else {
                value = (a.attributeValueType === "template" ? a.attributeValueTemplate : a.attributeValueExpression)
                    ?.value;
            }
            return [name, value ?? ""];
        })
        .reduce((obj, [name, value]) => {
            switch (name) {
                case "style":
                    obj.style = convertInlineCssToReactStyle(value);
                    break;
                case "class":
                    obj.className = value;
                    break;
                default:
                    obj[name] = value;
                    break;
            }

            return obj;
        }, {} as Record<string, any>);

    attributes.style = {
        ...style,
        ...attributes.style
    };

    attributes.className = classNames("html-node-widget", attributes.className, cls);

    return attributes;
}
