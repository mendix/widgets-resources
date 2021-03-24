import classNames from "classnames";
import {
    isBehindElement,
    isBehindRandomElement,
    isElementPartiallyOffScreen,
    isElementVisibleByUser,
    moveAbsoluteElementOnScreen,
    handleOnClickOutsideElement,
    unBlockAbsoluteElementLeft,
    unBlockAbsoluteElementBottom,
    unBlockAbsoluteElementRight,
    unBlockAbsoluteElementTop
} from "../utils/document";
import { ReactElement, useState, createElement, useCallback, useEffect, useRef } from "react";
import { executeAction } from "@mendix/piw-utils-internal";
import { ActionValue } from "mendix";

import { PopupMenuContainerProps, PositionEnum } from "../../typings/PopupMenuProps";

export interface PopupMenuProps extends PopupMenuContainerProps {
    preview?: boolean;
}

export function PopupMenu(props: PopupMenuProps): ReactElement {
    const preview = !!props.preview;
    const [visibility, setVisibility] = useState(preview && props.menuToggle);
    const ref = useRef<HTMLDivElement>(null);
    if (!preview) {
        handleOnClickOutsideElement(ref, () => setVisibility(false));
    }
    const handleOnClickTrigger = useCallback((): void => {
        setVisibility(prev => !prev);
    }, [visibility, setVisibility]);
    const handleOnClickItem = useCallback(
        (itemAction?: ActionValue): void => {
            setVisibility(false);
            executeAction(itemAction);
        },
        [setVisibility]
    );
    const menuOptions = createMenuOptions(props, handleOnClickItem);
    const onHover =
        props.trigger === "onhover" && !preview
            ? {
                  onMouseEnter: handleOnClickTrigger,
                  onMouseLeave: handleOnClickTrigger
              }
            : {};
    const onClick =
        props.trigger === "onclick" && !preview
            ? {
                  onClick: handleOnClickTrigger
              }
            : {};

    useEffect(() => {
        const element = ref.current?.querySelector(".popupmenu-menu") as HTMLDivElement | null;
        if (element) {
            element.style.display = visibility ? "flex" : "none";
            if (visibility) {
                correctPosition(element, props.position);
            }
        }
    }, [visibility]);
    useEffect(() => {
        setVisibility(props.menuToggle);
    }, [props.menuToggle]);

    return (
        <div ref={ref} className={classNames("popupmenu", props.class)} {...onHover}>
            <div className={"popupmenu-trigger"} {...onClick}>
                {props.menuTrigger}
            </div>
            <div className={classNames("popupmenu-menu", `popupmenu-position-${props.position}`)}>{menuOptions}</div>
        </div>
    );
}

function createMenuOptions(
    props: PopupMenuContainerProps,
    handleOnClickItem: (itemAction?: ActionValue) => void
): ReactElement[] {
    if (!props.advancedMode) {
        return props.basicItems.map((item, index) => {
            if (item.itemType === "divider") {
                return <div key={index} className={"popupmenu-basic-divider"} />;
            } else {
                const pickedStyle =
                    item.styleClass !== "defaultStyle"
                        ? "popupmenu-basic-item-" + item.styleClass.replace("Style", "")
                        : "";
                return (
                    <div
                        key={index}
                        className={classNames("popupmenu-basic-item", pickedStyle)}
                        onClick={() => handleOnClickItem(item.action)}
                    >
                        {item.caption?.value ?? ""}
                    </div>
                );
            }
        });
    } else {
        return props.customItems.map((item, index) => (
            <div key={index} className={"popupmenu-custom-item"} onClick={() => handleOnClickItem(item.action)}>
                {item.content}
            </div>
        ));
    }
}

function correctPosition(element: HTMLElement, position: PositionEnum): void {
    const dynamicDocument: Document = element.ownerDocument;
    const dynamicWindow = dynamicDocument.defaultView as Window;
    let boundingRect: DOMRect = element.getBoundingClientRect();
    const isOffScreen = isElementPartiallyOffScreen(dynamicWindow, boundingRect);
    if (isOffScreen) {
        moveAbsoluteElementOnScreen(dynamicWindow, element, boundingRect);
    }

    boundingRect = element.getBoundingClientRect();
    const blockingElement = isBehindRandomElement(dynamicDocument, element, boundingRect, 3, "popupmenu");
    if (blockingElement && isElementVisibleByUser(dynamicDocument, dynamicWindow, blockingElement)) {
        unBlockAbsoluteElement(element, boundingRect, blockingElement.getBoundingClientRect(), position);
    } else if (blockingElement) {
        let node = blockingElement;
        do {
            if (isBehindElement(element, node, 3) && isElementVisibleByUser(dynamicDocument, dynamicWindow, node)) {
                return unBlockAbsoluteElement(element, boundingRect, node.getBoundingClientRect(), position);
            } else {
                node = node.parentElement as HTMLElement;
            }
        } while (node.parentElement);
    }
}

function unBlockAbsoluteElement(
    element: HTMLElement,
    boundingRect: DOMRect,
    blockingElementRect: DOMRect,
    position: PositionEnum
): void {
    switch (position) {
        case "left":
            unBlockAbsoluteElementLeft(element, boundingRect, blockingElementRect);
            unBlockAbsoluteElementBottom(element, boundingRect, blockingElementRect);
            break;
        case "right":
            unBlockAbsoluteElementRight(element, boundingRect, blockingElementRect);
            unBlockAbsoluteElementBottom(element, boundingRect, blockingElementRect);
            break;
        case "top":
            unBlockAbsoluteElementTop(element, boundingRect, blockingElementRect);
            break;
        case "bottom":
            unBlockAbsoluteElementBottom(element, boundingRect, blockingElementRect);
            break;
    }
}
