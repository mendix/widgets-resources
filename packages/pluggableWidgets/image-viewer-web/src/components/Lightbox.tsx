import classNames from "classnames";
import { createElement, ReactElement, useCallback } from "react";
import Modal, { RenderModalBackdropProps } from "react-overlays/Modal";

import closeIconSvg from "../assets/ic24-close.svg";

export interface LightboxProps {
    children: ReactElement;
    isOpen: boolean;
    onClose: () => void;
}

interface RenderBackdropWithCloseProps extends RenderModalBackdropProps {
    onClose: () => void;
}

/**
 * The `onClick` here is provided by the `onHide` from the Modal props. But unfortunately it only works
 * for the actual backdrop and not for other elements due to a `e.target !== e.currentTarget` check in
 * the library. Therefore, we extend it with an additional `onClose` prop for our close button.
 */
function BackdropWithClose({ ref, onClose, onClick }: RenderBackdropWithCloseProps): ReactElement {
    return (
        <div className="mx-image-viewer-lightbox-backdrop" ref={ref} onClick={onClick}>
            <button className={classNames("btn btn-image btn-icon close-button")} onClick={onClose}>
                <img src={closeIconSvg} className={"removeIcon"} alt="Close icon for the full screen image lightbox" />
            </button>
        </div>
    );
}

export function Lightbox({ isOpen, onClose, children }: LightboxProps): ReactElement {
    const renderBackdropWithClose = useCallback(
        (props: RenderModalBackdropProps) => <BackdropWithClose onClose={onClose} {...props} />,
        [onClose]
    );

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            renderBackdrop={renderBackdropWithClose}
            className="mx-image-viewer-lightbox"
        >
            <div>{children}</div>
        </Modal>
    );
}
