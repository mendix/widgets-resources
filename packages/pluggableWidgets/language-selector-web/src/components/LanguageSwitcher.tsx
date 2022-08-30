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
} from "../utils/document";
import { PositionEnum, TriggerEnum } from "../../typings/LanguageSelectorProps";
import { LanguageItem } from "../LanguageSelector";

export interface LanguageSwitcherProps {
    preview: boolean;
    currentLanguage: LanguageItem | undefined;
    languageList: LanguageItem[];
    position: PositionEnum;
    onSelect?: (lang: LanguageItem) => void;
    trigger: TriggerEnum;
    className: string;
}
export const LanguageSwitcher = (props: LanguageSwitcherProps): ReactElement => {
    const preview = !!props.preview;
    const { languageList, trigger } = props;
    const [visibility, setVisibility] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    if (!preview) {
        handleOnClickOutsideElement(ref, () => setVisibility(false));
    }

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
        <div ref={ref} className={classNames(props.className, "widget-language-selector", "popupmenu")} {...onHover}>
            <div className={"popupmenu-trigger popupmenu-trigger-alignment"} {...onClick}>
                <span className="current-language-text">{props.currentLanguage?.value || ""}</span>
                <span
                    className={`language-arrow glyphicon glyphicon-chevron-${visibility ? "up" : "down"}`}
                    aria-hidden="true"
                ></span>
            </div>
            <div className={classNames("popupmenu-menu", `popupmenu-position-${props.position}`)}>
                {languageList.map(item => (
                    <div
                        key={item._guid}
                        className={"popupmenu-basic-item"}
                        onClick={() => {
                            if (props.onSelect) {
                                return props.onSelect(item);
                            }
                        }}
                    >
                        {item.value}
                    </div>
                ))}
            </div>
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
