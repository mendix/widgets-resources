import classNames from "classnames";
import React, { createElement, ReactElement, useCallback } from "react";
import Modal, { ModalProps, RenderModalBackdropProps } from "react-overlays/Modal";

import closeIconSvg from "../assets/ic24-close.svg";

export interface LightboxProps {
    children: ReactElement;
    isOpen: boolean;
    onClose: RenderBackdropWithCloseProps["onClose"];
}

export interface RenderBackdropWithCloseProps extends RenderModalBackdropProps {
    // `event` is optional here because `ModalProps['onHide'] does not require it, but is
    // preceeded by `ModalProps['onBackdropClick']` that will prevent the event propagation.
    onClose: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * The `onClick` here is provided by the `onHide` from the Modal props. But unfortunately it only works
 * for the actual backdrop and not for other elements due to a `e.target !== e.currentTarget` check in
 * the library. Therefore, we extend it with an additional `onClose` prop for our close button.
 */
function BackdropWithClose({ onClose, ...restProps }: RenderBackdropWithCloseProps): ReactElement {
    return (
        <div className="mx-image-viewer-lightbox-backdrop" {...restProps}>
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

    // This is to prevent on click from containers when clicking on the backdrop.
    const preventBackdropEventPropagation = useCallback<Exclude<ModalProps["onBackdropClick"], undefined>>(event => {
        event.stopPropagation();
    }, []);

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            renderBackdrop={renderBackdropWithClose}
            onBackdropClick={preventBackdropEventPropagation}
            className="mx-image-viewer-lightbox"
        >
            <div>{children}</div>
        </Modal>
    );
}
