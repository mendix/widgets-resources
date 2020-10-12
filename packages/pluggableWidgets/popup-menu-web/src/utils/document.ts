import { RefObject, useEffect } from "react";

function isElementBlockedTop(dynamicWindow: Window, srcRect: DOMRect, blockingRect: DOMRect) {
    return (
        srcRect.top < blockingRect.bottom &&
        srcRect.bottom >= blockingRect.bottom &&
        srcRect.y + srcRect.height < dynamicWindow.innerHeight
    );
}

function isElementBlockedBottom(srcRect: DOMRect, blockingRect: DOMRect) {
    return srcRect.bottom > blockingRect.top && srcRect.top <= blockingRect.top && srcRect.y - srcRect.height > 0;
}

function isElementBlockedLeft(srcRect: DOMRect, blockingRect: DOMRect) {
    return (
        srcRect.left < blockingRect.right && srcRect.right >= blockingRect.right && srcRect.left >= blockingRect.left
    );
}

function isElementBlockedRight(srcRect: DOMRect, blockingRect: DOMRect) {
    return (
        srcRect.right > blockingRect.left && srcRect.left <= blockingRect.left && srcRect.right <= blockingRect.right
    );
}

export function unBlockAbsoluteElementTop(
    element: HTMLElement,
    boundingRect: DOMRect,
    blockingElementRect: DOMRect
): void {
    const dynamicWindow = element.ownerDocument.defaultView as Window;
    if (isElementBlockedTop(dynamicWindow, boundingRect, blockingElementRect)) {
        element.style.top =
            getPixelValueAsNumber(element, "top") + blockingElementRect.bottom - boundingRect.top + "px";
    }
}

export function unBlockAbsoluteElementBottom(
    element: HTMLElement,
    boundingRect: DOMRect,
    blockingElementRect: DOMRect
): void {
    if (isElementBlockedBottom(boundingRect, blockingElementRect)) {
        element.style.top = "unset"; // Unset top defined in PopupMenu.scss
        element.style.bottom =
            getPixelValueAsNumber(element, "bottom") + blockingElementRect.top - boundingRect.bottom + "px";
    }
}

export function unBlockAbsoluteElementLeft(
    element: HTMLElement,
    boundingRect: DOMRect,
    blockingElementRect: DOMRect
): void {
    if (isElementBlockedLeft(boundingRect, blockingElementRect)) {
        element.style.left =
            getPixelValueAsNumber(element, "left") + blockingElementRect.right - boundingRect.left + "px";
    }
}

export function unBlockAbsoluteElementRight(
    element: HTMLElement,
    boundingRect: DOMRect,
    blockingElementRect: DOMRect
): void {
    if (isElementBlockedRight(boundingRect, blockingElementRect)) {
        element.style.right =
            getPixelValueAsNumber(element, "right") + blockingElementRect.left - boundingRect.right + "px";
    }
}

export function getPixelValueAsNumber(element: HTMLElement, prop: keyof CSSStyleDeclaration): number {
    const value = (getComputedStyle(element) as CSSStyleDeclaration)[prop] as string;
    const num = Number(value.split("px")[0]);
    return value ? num : 0;
}

function isBehindRandomElementCheck(
    element: HTMLElement,
    blockingElement: HTMLElement,
    excludeElements: HTMLElement[],
    excludeElementWithClass: string
) {
    return (
        blockingElement &&
        blockingElement !== element &&
        !blockingElement.classList.contains(excludeElementWithClass) &&
        (!excludeElements ||
            !excludeElements.map((elem: HTMLElement) => elem.contains(blockingElement)).filter(elem => elem).length) &&
        !element.contains(blockingElement)
    );
}

export function isBehindRandomElement(
    dynamicDocument: Document,
    element: HTMLElement,
    boundingRect: DOMRect,
    offset = 3,
    excludeElementWithClass = ""
): HTMLElement | false {
    let excludeElements: HTMLElement[] = [];
    const left = Math.round(boundingRect.left + offset);
    const right = Math.round(boundingRect.right - offset);
    const top = Math.round(boundingRect.top + offset);
    const bottom = Math.round(boundingRect.bottom - offset);
    const elementTopLeft = dynamicDocument.elementFromPoint(left, top) as HTMLElement;
    const elementTopRight = dynamicDocument.elementFromPoint(right, top) as HTMLElement;
    const elementBottomLeft = dynamicDocument.elementFromPoint(left, bottom) as HTMLElement;
    const elementBottomRight = dynamicDocument.elementFromPoint(right, bottom) as HTMLElement;
    if (excludeElementWithClass) {
        excludeElementWithClass = excludeElementWithClass.replace(/\./g, "");
        excludeElements = [...(dynamicDocument.querySelectorAll(`.${excludeElementWithClass}`) as any)];
    }

    if (isBehindRandomElementCheck(element, elementTopLeft, excludeElements, excludeElementWithClass)) {
        return elementTopLeft;
    }
    if (isBehindRandomElementCheck(element, elementTopRight, excludeElements, excludeElementWithClass)) {
        return elementTopRight;
    }
    if (isBehindRandomElementCheck(element, elementBottomLeft, excludeElements, excludeElementWithClass)) {
        return elementBottomLeft;
    }
    if (isBehindRandomElementCheck(element, elementBottomRight, excludeElements, excludeElementWithClass)) {
        return elementBottomRight;
    }

    return false;
}

export function isBehindElement(element: HTMLElement, blockingElement: HTMLElement, offset = 3): boolean {
    const elementRect: DOMRect = element.getBoundingClientRect();
    const blockingElementRect: DOMRect = blockingElement.getBoundingClientRect();
    const left = elementRect.left + offset;
    const right = elementRect.right - offset;
    const top = elementRect.top + offset;
    const bottom = elementRect.bottom - offset;

    return (
        (left < blockingElementRect.right && left > blockingElementRect.left) ||
        (right > blockingElementRect.left && right < blockingElementRect.right) ||
        (top < blockingElementRect.bottom && top > blockingElementRect.top) ||
        (bottom > blockingElementRect.top && bottom < blockingElementRect.bottom)
    );
}

export function isElementVisibleByUser(
    dynamicDocument: Document,
    dynamicWindow: Window,
    element: HTMLElement
): boolean {
    const style: CSSStyleDeclaration = getComputedStyle(element);
    if (style.display === "none") {
        return false;
    }
    if (style.visibility && style.visibility !== "visible") {
        return false;
    }
    if (style.opacity && Number(style.opacity) < 0.1) {
        return false;
    }
    const rect = element.getBoundingClientRect();
    if (Math.round(element.offsetWidth + element.offsetHeight + rect.height + rect.width) === 0) {
        return false;
    }
    const elementCenter = {
        x: Math.round(rect.left + element.offsetWidth / 2),
        y: Math.round(rect.top + element.offsetHeight / 2)
    };
    if (!elementCenter.x || !elementCenter.y) {
        return false;
    }
    if (elementCenter.x < 0) {
        return false;
    }
    if (elementCenter.x > (dynamicDocument.documentElement.clientWidth || dynamicWindow.innerWidth)) {
        return false;
    }
    if (elementCenter.y < 0) {
        return false;
    }
    if (elementCenter.y > (dynamicDocument.documentElement.clientHeight || dynamicWindow.innerHeight)) {
        return false;
    }
    let pointContainer: Element | null = dynamicDocument.elementFromPoint(elementCenter.x, elementCenter.y);
    if (pointContainer) {
        do {
            if (pointContainer === element) {
                return true;
            } else {
                pointContainer = pointContainer.parentElement as HTMLElement;
            }
        } while (pointContainer.parentElement);
    }
    return false;
}

export function isElementPartiallyOffScreen(dynamicWindow: Window, rect: DOMRect): boolean {
    return (
        rect.x < 0 ||
        rect.y < 0 ||
        rect.x + rect.width > dynamicWindow.innerWidth ||
        rect.y + rect.height > dynamicWindow.innerHeight
    );
}

export function moveAbsoluteElementOnScreen(
    dynamicWindow: Window,
    element: HTMLElement,
    boundingRect: DOMRect
): DOMRect {
    if (boundingRect.x < 0) {
        const leftValue = Math.round(getPixelValueAsNumber(element, "left") - boundingRect.x);
        element.style.left = leftValue + "px";
        boundingRect.x += leftValue;
    }
    if (boundingRect.y < 0) {
        const topValue = Math.round(getPixelValueAsNumber(element, "top") - boundingRect.y);
        element.style.top = topValue + "px";
        boundingRect.y += topValue;
    }
    if (boundingRect.x + boundingRect.width > dynamicWindow.innerWidth) {
        const rightValue = Math.round(
            getPixelValueAsNumber(element, "right") + (boundingRect.x + boundingRect.width - dynamicWindow.innerWidth)
        );
        element.style.right = rightValue + "px";
        boundingRect.x -= rightValue;
    }
    if (boundingRect.y + boundingRect.height > dynamicWindow.innerHeight) {
        const bottomValue = Math.round(
            getPixelValueAsNumber(element, "bottom") +
                (boundingRect.y + boundingRect.height - dynamicWindow.innerHeight)
        );
        element.style.top = "unset"; // Unset top defined in PopupMenu.scss
        element.style.bottom = bottomValue + "px";
        boundingRect.y -= bottomValue;
    }
    return boundingRect;
}

export function handleOnClickOutsideElement(ref: RefObject<HTMLDivElement>, handler: () => void): void {
    useEffect(() => {
        const listener = (event: MouseEvent & { target: Node | null }): void => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };
        ref.current?.ownerDocument.addEventListener("mousedown", listener);
        ref.current?.ownerDocument.addEventListener("touchstart", listener);
        return () => {
            ref.current?.ownerDocument.removeEventListener("mousedown", listener);
            ref.current?.ownerDocument.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
