import classNames from "classnames";
import { createElement, ReactElement, useEffect, useRef, useState, useCallback } from "react";
import {
    isBehindElement,
    isBehindRandomElement,
    isElementPartiallyOffScreen,
    isElementVisibleByUser,
    moveAbsoluteElementOnScreen,
    unBlockAbsoluteElementBottom,
    unBlockAbsoluteElementLeft,
    unBlockAbsoluteElementRight,
    unBlockAbsoluteElementTop,
    handleOnClickOutsideElement
} from "@mendix/piw-utils-internal";
import { PositionEnum, TriggerEnum } from "../../typings/LanguageSelectorProps";
import { LanguageItem } from "../LanguageSelector";

export interface LanguageSwitcherProps {
    preview: boolean;
    currentLanguage: LanguageItem | undefined;
    languageList: LanguageItem[];
    position: PositionEnum;
    onSelect: (lang: LanguageItem) => void;
    trigger: TriggerEnum;
}
export const LanguageSwitcher = (props: LanguageSwitcherProps): ReactElement => {
    const preview = !!props.preview;
    const { languageList, trigger } = props;
    const [visibility, setVisibility] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    if (!preview) {
        handleOnClickOutsideElement(ref, () => setVisibility(false));
    }
    const menuOptions = (): ReactElement[] => {
        return languageList.map(item => {
            return (
                <div key={item._guid} className={"popupmenu-basic-item"} onClick={() => props.onSelect(item)}>
                    {item.value}
                </div>
            );
        });
    };

    const onClickHandle = useCallback(
        (e): void => {
            e.preventDefault();
            e.stopPropagation();
            setVisibility(prev => !prev);
        },
        [setVisibility]
    );

    const onHover =
        trigger === "hover"
            ? {
                  onMouseEnter: onClickHandle,
                  onMouseLeave: onClickHandle
              }
            : {};

    const onClick = trigger === "click" ? { onClick: onClickHandle } : {};

    useEffect(() => {
        const element = ref.current?.querySelector(".popupmenu-menu") as HTMLDivElement | null;
        if (element) {
            element.style.display = visibility ? "flex" : "none";
            if (visibility) {
                correctPosition(element, props.position);
            }
        }
    }, [props.position, visibility]);

    return (
        <div ref={ref} className={classNames("popupmenu")} {...onHover}>
            <div className={"popupmenu-trigger"} {...onClick}>
                {props?.currentLanguage?.value || ""}
            </div>
            <div className={classNames("popupmenu-menu", `popupmenu-position-${props.position}`)}>{menuOptions()}</div>
        </div>
    );
};

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
            } else if (node.parentElement) {
                node = node.parentElement as HTMLElement;
            } else {
                break;
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
