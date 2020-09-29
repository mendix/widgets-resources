import {
    isBehindElement,
    isBehindRandomElement,
    isElementPartiallyOffScreen,
    isElementVisibleByUser,
    moveAbsoluteElementOnScreen,
    unBlockAbsoluteElement,
    handleOnClickOutsideElement
} from "./utils/document";
import { ReactElement, useState, createElement, useCallback, useEffect, useRef } from "react";
import { executeAction } from "@widgets-resources/piw-utils";
import { ActionValue } from "mendix";

import { PopupMenuContainerProps } from "../typings/PopupMenuProps";
import "./ui/PopupMenu.scss";

export default function PopupMenu(props: PopupMenuContainerProps): ReactElement {
    const ref = useRef<HTMLDivElement>(null);
    handleOnClickOutsideElement(ref, () => setVisibility(false));
    const [visibility, setVisibility] = useState(false);
    useEffect(() => {
        const element = ref.current?.querySelector(".popupmenu-menu") as HTMLDivElement | null;
        if (element) {
            element.style.display = visibility ? "flex" : "none";
            if (visibility) {
                correctPosition(element);
            }
        }
    }, [visibility]);
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
        props.trigger === "onhover"
            ? {
                  onMouseEnter: handleOnClickTrigger,
                  onMouseLeave: handleOnClickTrigger
              }
            : {};
    const onClick =
        props.trigger === "onclick"
            ? {
                  onClick: handleOnClickTrigger
              }
            : {};

    return (
        <div ref={ref} className={"popupmenu " + props.class} {...onHover}>
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
            const pickedStyle =
                item.styleClass !== "defaultStyle"
                    ? "popupmenu-basic-item-" + item.styleClass.replace("Style", "")
                    : "";
            return item.itemType === "divider" ? (
                <div key={index} className={"popupmenu-basic-divider"} />
            ) : (
                <div
                    key={index}
                    className={`popupmenu-basic-item ${pickedStyle}`}
                    onClick={() => {
                        handleOnClickItem(item.action);
                    }}
                >
                    {item.caption}
                </div>
            );
        });
    } else {
        return props.customItems.map((item, index) => (
            <div key={index} className={"popupmenu-custom-item"} onClick={() => handleOnClickItem(item.action)}>
                {item.content}
            </div>
        ));
    }
}

function correctPosition(element: HTMLElement): void {
    const isOffScreen = isElementPartiallyOffScreen(element);
    if (isOffScreen) {
        moveAbsoluteElementOnScreen(element);
    }
    const boundingRect: DOMRect = element.getBoundingClientRect();
    const blockingElement = isBehindRandomElement(element, boundingRect, 3, "popupmenu");
    if (blockingElement && isElementVisibleByUser(blockingElement)) {
        unBlockAbsoluteElement(element, boundingRect, blockingElement.getBoundingClientRect());
    } else if (blockingElement) {
        let node = blockingElement;
        do {
            if (isBehindElement(element, node, 1) && isElementVisibleByUser(node)) {
                unBlockAbsoluteElement(element, boundingRect, node.getBoundingClientRect());
                return;
            } else {
                node = node.parentElement as HTMLElement;
            }
        } while (node.parentElement);
    }
}
