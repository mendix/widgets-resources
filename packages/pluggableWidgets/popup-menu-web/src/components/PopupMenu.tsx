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
import { executeAction } from "@widgets-resources/piw-utils";
import { ActionValue } from "mendix";

import { PopupMenuContainerProps, PositionEnum } from "../../typings/PopupMenuProps";

interface PopupMenuProps extends PopupMenuContainerProps {
    preview?: boolean;
}

export function PopupMenu(props: PopupMenuProps): ReactElement {
    const preview = !!props.preview;
    const [visibility, setVisibility] = useState(preview && props.menuToggle);
    const ref = useRef<HTMLDivElement>(null);
    if (!preview) handleOnClickOutsideElement(ref, () => setVisibility(false));
    // Events
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
    // Properties
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
        <div ref={ref} className={"popupmenu " + (props.class?.length ? props.class : "")} {...onHover}>
            <div className={"popupmenu-trigger"} {...onClick}>
                {props.menuTrigger}
            </div>
            <div className={`popupmenu-menu popupmenu-position-${props.position}`}>{menuOptions}</div>
        </div>
    );
}

function createMenuOptions(
    props: PopupMenuContainerProps,
    handleOnClickItem: (itemAction?: ActionValue) => void
): ReactElement[] {
    if (props.renderMode === "basic") {
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
                        className={`popupmenu-basic-item ${pickedStyle}`}
                        onClick={() => handleOnClickItem(item.action)}
                    >
                        {item.caption}
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
    let elem: HTMLElement = element;
    let boundingRect: DOMRect = element.getBoundingClientRect();
    const isOffScreen = isElementPartiallyOffScreen(boundingRect);
    if (isOffScreen) {
        moveAbsoluteElementOnScreen(elem, boundingRect);
    }

    boundingRect = element.getBoundingClientRect();
    const blockingElement = isBehindRandomElement(elem, boundingRect, 3, "popupmenu");
    if (!!blockingElement && isElementVisibleByUser(blockingElement)) {
        unBlockAbsoluteElement(elem, boundingRect, blockingElement.getBoundingClientRect(), position);
    } else if (!!blockingElement) {
        let node = blockingElement;
        do {
            if (isBehindElement(elem, node, 3) && isElementVisibleByUser(node)) {
                return unBlockAbsoluteElement(elem, boundingRect, node.getBoundingClientRect(), position);
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
