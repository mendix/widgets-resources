import { DOM, SFC, SyntheticEvent } from "react";

export const Overlay: SFC<{ myRef: (node: HTMLElement) => void }> = ({ children, myRef }) =>
    DOM.div({
            ref: (node) => myRef(node),
            style: { position: "relative" }
        },
        children,
        DOM.div({
            onClick: preventEvent,
            onTouchStart: preventEvent,
            style: {
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: 10
            }
        })
    );

const preventEvent = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
};

Overlay.displayName = "Overlay";
