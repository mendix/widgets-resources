import { useOnClickOutside } from "@mendix/piw-utils-internal";
import classNames from "classnames";
import { createElement, ReactElement, useRef } from "react";
import ReactModal from "react-modal";

import closeIconSvg from "../assets/ic24-close.svg";

interface LightboxProps {
    children: ReactElement;
    isOpen: boolean;
    onClose: () => void;
}

const modalStyle = {
    // Only way to style the content div of `ReactModal` is through inline styles.
    content: {
        backgroundColor: "transparent",
        overflow: "hidden", // Needed, otherwise keyboard shortcuts scroll the page
        border: "none",
        borderRadius: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
};

export function Lightbox({ isOpen, onClose, children }: LightboxProps): ReactElement {
    const imageElement = useRef<HTMLDivElement>(null);
    useOnClickOutside(imageElement, onClose);

    return (
        <ReactModal
            isOpen={isOpen}
            style={modalStyle}
            onRequestClose={onClose}
            overlayClassName="mx-image-viewer-lightbox-overlay"
            appElement={typeof window !== "undefined" ? window.document.body : undefined}
            preventScroll
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
        >
            <button className={classNames("btn btn-image btn-icon close-button")} onClick={onClose}>
                <img
                    src={closeIconSvg}
                    className={classNames("removeIcon")}
                    alt="Close icon for the full screen image lightbox"
                />
            </button>
            <div ref={imageElement}>{children}</div>
        </ReactModal>
    );
}
