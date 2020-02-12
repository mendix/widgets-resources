export function setFocus(element) {
    clearSelection();
    element.focus();
    selectText(element);
}
function clearSelection() {
    // This is necessary for IE and Edge
    const selection = document.getSelection();
    if (selection === null || isEmptySelection(selection)) {
        // Prevent IE11 from switching focus to document.body unless absolutely necessary
        return;
    }
    selection.removeAllRanges();
    selection.addRange(document.createRange());
}
function isEmptySelection(selection) {
    if (selection.rangeCount === 1) {
        const range = selection.getRangeAt(0);
        return range.startOffset === range.endOffset;
    }
    return selection.rangeCount === 0;
}
function selectText(element) {
    const input = element;
    if (input.type === "text" || input.type === "password") {
        input.select();
    }
}
export function getFocus() {
    const activeElement = document.activeElement && getHTMLElement(document.activeElement);
    return activeElement !== document.body ? activeElement : null;
}
export function clearFocus() {
    const current = getFocus();
    if (current) {
        current.blur();
    }
}
export function focusFirst(container) {
    const first = findFirst(container);
    if (first) {
        setFocus(first);
    }
}
export function focusNext() {
    const next = findNext(getFocus());
    if (next) {
        setFocus(next);
    }
}
export function findFirst(container) {
    return findNextInContainer(container, false);
}
export function findNext(target, reverse = false) {
    var _a;
    const element = target && getHTMLElement(target);
    const next = () => element && findNextNonWrapping(element, reverse);
    const wrapAround = () => {
        var _a;
        return findNextNonWrapping(
            ((_a = getFocusCapturingRoot(element)), _a !== null && _a !== void 0 ? _a : document.body),
            reverse
        );
    };
    return (_a = next()), _a !== null && _a !== void 0 ? _a : wrapAround();
}
function findNextNonWrapping(element, reverse = false) {
    const focusRoot = getFocusRoot(element);
    let current;
    if (!focusRoot.contains(element)) {
        if (isFocusable(focusRoot)) {
            return focusRoot;
        }
        current = focusRoot;
    } else {
        current = element;
    }
    let found;
    if (!reverse && isFocusContext(current) && !skipContainer(current)) {
        found = findNextInContainer(current, !!reverse);
        if (found) {
            return found;
        }
    }
    do {
        const context = findFocusContext(current, focusRoot);
        found = findNextInContainer(context, !!reverse, current);
        if (found) {
            return found;
        }
        if (reverse && isFocusable(context)) {
            return context;
        }
        current = context;
    } while (current !== focusRoot);
    return null;
}
const FOCUS_CONTEXT_ATTRIBUTE = "data-focusindex";
const FOCUS_CAPTURING_ATTRIBUTE = "data-focus-capturing";
const FOCUS_CAPTURING_MODAL = "modal";
const FOCUS_CAPTURING_NON_MODAL = "non-modal";
function findFocusContext(element, focusRoot) {
    if (element === focusRoot) {
        return focusRoot;
    }
    let current = element;
    while (current !== focusRoot && current.parentElement) {
        current = current.parentElement;
        if (isFocusContext(current)) {
            return current;
        }
    }
    return focusRoot;
}
function getFocusRoot(element) {
    var _a;
    const capturingRoot = getFocusCapturingRoot(element);
    if (!capturingRoot) {
        // We're outside all focus capturing elements, e.g. in a floating popup
        return document.body;
    }
    return (_a = getModalFocusRoot()), _a !== null && _a !== void 0 ? _a : capturingRoot;
}
function getModalFocusRoot() {
    const focusRoots = document.querySelectorAll(`[${FOCUS_CAPTURING_ATTRIBUTE}=${FOCUS_CAPTURING_MODAL}]`);
    const focusRoot = focusRoots.length ? focusRoots[focusRoots.length - 1] : null;
    return focusRoot && isHTMLElement(focusRoot) ? focusRoot : null;
}
function getFocusCapturingRoot(element) {
    if (!element || element === document.body) {
        return document.body;
    }
    let current = element;
    while (current && isHTMLElement(current)) {
        const captureMode = current.getAttribute(FOCUS_CAPTURING_ATTRIBUTE);
        if (captureMode === FOCUS_CAPTURING_MODAL || captureMode === FOCUS_CAPTURING_NON_MODAL) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
function findNextInContainer(container, reverse, afterElement) {
    const startTabIndex = afterElement && afterElement !== container ? getEffectiveTabIndex(afterElement) : undefined;
    const candidates = gatherDescendants(container);
    const tabIndices = Object.keys(candidates)
        .map(s => parseInt(s, 10))
        .filter(tabIndexFilter(startTabIndex, reverse))
        .sort(compareTabIndex);
    if (reverse) {
        tabIndices.reverse();
    }
    for (const tabIndex of tabIndices) {
        let array = candidates[tabIndex];
        if (array !== undefined) {
            if (reverse) {
                array.reverse();
            }
            if (tabIndex === startTabIndex) {
                array = array.slice(array.indexOf(afterElement) + 1);
            }
            const candidate = findNextInArray(array, reverse);
            if (candidate) {
                return candidate;
            }
        }
    }
    return null;
}
function findNextInArray(array, reverse) {
    for (const element of array) {
        if (!reverse && isFocusable(element)) {
            return element;
        }
        if (isFocusContext(element) && !skipContainer(element)) {
            const candidate = findNextInContainer(element, reverse);
            if (candidate) {
                return candidate;
            }
        }
        if (reverse && isFocusable(element)) {
            return element;
        }
    }
    return null;
}
function gatherDescendants(e, output = {}) {
    for (let i = 0; i < e.children.length; i++) {
        const child = e.children.item(i);
        if (!isHTMLElement(child)) {
            continue;
        }
        const tabIndex = getEffectiveTabIndex(child);
        const elements = (output[tabIndex] = tabIndex in output ? output[tabIndex] : []);
        elements.push(child);
        if (!isFocusContext(child)) {
            gatherDescendants(child, output);
        }
    }
    return output;
}
function tabIndexFilter(startTabIndex, reverse) {
    return startTabIndex === undefined
        ? () => true
        : reverse
        ? t => compareTabIndex(t, startTabIndex) <= 0
        : t => compareTabIndex(t, startTabIndex) >= 0;
}
function compareTabIndex(a, b) {
    return a === b ? 0 : a === 0 ? 1 : b === 0 ? -1 : a - b;
}
function isFocusContext(element) {
    return element === document.body || element.getAttribute(FOCUS_CONTEXT_ATTRIBUTE) !== null;
}
function getEffectiveTabIndex(element) {
    const focusIndex = getIntAttribute(element, FOCUS_CONTEXT_ATTRIBUTE);
    const tabIndexValue = focusIndex !== null ? focusIndex : getTabIndex(element);
    // An element with tabindex -1 is placed within the natural order of elements with effective tabindex 0
    return Math.max(0, tabIndexValue !== null && tabIndexValue !== void 0 ? tabIndexValue : 0);
}
function getTabIndex(element) {
    const tabIndex = getIntAttribute(element, "tabindex");
    return tabIndex !== -32768 ? tabIndex : null; // -32768 is returned by IE/Edge for tabindex="" :(
}
function getIntAttribute(element, attribute) {
    const value = element.getAttribute(attribute);
    return value ? parseInt(value, 10) : null;
}
function skipContainer(element) {
    return element.getAttribute(FOCUS_CONTEXT_ATTRIBUTE) === "-1";
}
export function isFocusable(element) {
    return isNavigableElement(element) && isInteractive(element);
}
export function isNavigableElement(element) {
    if (skipContainer(element)) {
        return false;
    }
    const tabIndex = getTabIndex(element);
    return (tabIndex === null ? getDefaultTabIndex(element) : tabIndex) >= 0;
}
export function getFocusableContainer(target) {
    let element = getHTMLElement(target);
    while (element) {
        if (getTabIndex(element) !== null || getDefaultTabIndex(element) === 0) {
            return element;
        }
        element = element.parentElement;
    }
    return null;
}
function getDefaultTabIndex(element) {
    // We have to check this ourselves, because IE and Edge return the wrong default value for the tabIndex JS property.
    switch (element.tagName.toLowerCase()) {
        case "a":
        case "area":
        case "button":
        case "input":
        case "object":
        case "select":
        case "textarea":
            return 0;
        default:
            return element.getAttribute("contenteditable") ? 0 : -1;
    }
}
export function isInteractive(element) {
    return isVisible(element) && isEnabled(element);
}
function isVisible(element) {
    if (element.offsetWidth === 0 && element.offsetHeight === 0) {
        return false;
    }
    return window.getComputedStyle(element).visibility === "visible";
}
function isEnabled(element) {
    return !element.disabled;
}
export function getHTMLElement(target) {
    return isHTMLElement(target) ? target : isNode(target) ? target.parentElement : null;
}
function isNode(target) {
    return target.parentElement !== undefined;
}
export function isHTMLElement(target) {
    return target.offsetParent !== undefined;
}
