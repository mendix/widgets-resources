import { ReactElement, createElement, ReactNode, Fragment, DOMAttributes, HTMLAttributes } from "react";

import { HTMLNodeContainerProps } from "../typings/HTMLNodeProps";
import { prepareAttributes, prepareEvents } from "./utils/props-utils";

export function HTMLNode(props: HTMLNodeContainerProps): ReactElement | null {
    const tag = props.tagName !== "__customTag__" ? props.tagName : props.tagNameCustom;
    if (props.tagUseRepeat) {
        const items = props.tagContentRepeatDataSource?.items;
        if (!items?.length) {
            return null;
        }

        return (
            <Fragment>
                {items.map(item => (
                    <HTMLTag
                        key={item.id}
                        attributes={prepareAttributes(props.attributes, props.class, props.style, item)}
                        events={prepareEvents(props.events, item)}
                        tagName={tag}
                        unsafeHTML={
                            props.tagContentMode === "innerHTML"
                                ? props.tagContentRepeatHTML?.get(item).value
                                : undefined
                        }
                    >
                        {props.tagContentMode !== "innerHTML" ? props.tagContentRepeatContainer?.get(item) : undefined}
                    </HTMLTag>
                ))}
            </Fragment>
        );
    } else {
        return (
            <HTMLTag
                attributes={prepareAttributes(props.attributes, props.class, props.style)}
                events={prepareEvents(props.events)}
                tagName={tag}
                unsafeHTML={props.tagContentMode === "innerHTML" ? props.tagContentHTML?.value : undefined}
            >
                {props.tagContentMode !== "innerHTML" ? props.tagContentContainer : undefined}
            </HTMLTag>
        );
    }
}

interface HTMLTagProps {
    tagName: string;
    unsafeHTML?: string;
    children: ReactNode;
    attributes: HTMLAttributes<Element>;
    events: DOMAttributes<Element>;
}

export function HTMLTag(props: HTMLTagProps): ReactElement {
    const Tag = `${props.tagName}` as keyof JSX.IntrinsicElements;
    const { unsafeHTML } = props;
    if (unsafeHTML !== undefined) {
        return <Tag {...props.attributes} {...props.events} dangerouslySetInnerHTML={{ __html: unsafeHTML }} />;
    }

    return (
        <Tag {...props.attributes} {...props.events} onClick={() => console.log(1)}>
            {props.children}
        </Tag>
    );
}
