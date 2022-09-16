import { createElement, DOMAttributes, HTMLAttributes, ReactElement, ReactNode } from "react";

interface HTMLTagProps {
    tagName: keyof JSX.IntrinsicElements;
    unsafeHTML?: string;
    children: ReactNode;
    attributes: HTMLAttributes<Element>;
    events: DOMAttributes<Element>;
}

export function HTMLTag(props: HTMLTagProps): ReactElement {
    const Tag = props.tagName;
    const { unsafeHTML } = props;
    if (unsafeHTML !== undefined) {
        return <Tag {...props.attributes} {...props.events} dangerouslySetInnerHTML={{ __html: unsafeHTML }} />;
    }

    return (
        <Tag {...props.attributes} {...props.events}>
            {props.children}
        </Tag>
    );
}
