import { ReactElement, createElement, Fragment } from "react";

import { HTMLNodeContainerProps } from "../typings/HTMLNodeProps";
import {
    createAttributeResolver,
    createEventResolver,
    prepareAttributes,
    prepareChildren,
    prepareEvents,
    prepareHtml,
    prepareTag
} from "./utils/props-utils";
import { HTMLTag } from "./components/HTMLTag";

export function HTMLNode(props: HTMLNodeContainerProps): ReactElement | null {
    const tag = prepareTag(props.tagName, props.tagNameCustom);
    const items = props.tagUseRepeat ? props.tagContentRepeatDataSource?.items : [undefined];

    if (!items?.length) {
        return null;
    }

    return (
        <Fragment>
            {items.map(item => (
                <HTMLTag
                    key={item?.id}
                    tagName={tag}
                    attributes={{
                        ...prepareAttributes(createAttributeResolver(item), props.attributes, props.class, props.style),
                        ...prepareEvents(createEventResolver(item), props.events)
                    }}
                    unsafeHTML={prepareHtml(props, item)}
                >
                    {prepareChildren(props, item)}
                </HTMLTag>
            ))}
        </Fragment>
    );
}
