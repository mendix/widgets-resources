// Usage
// import Utils from './test/utils'
// Utils.swipeRight(document, { pageX: 5, pageY: 0 }, { pageX: 450, pageY: 0 });

interface PageCoordinate {
    pageX: number;
    pageY: number;
}

export default class Utils {
    static swipeRight(node: HTMLElement, firstTouch: PageCoordinate, lastTouch: PageCoordinate) {
        Utils._fireSwipeEvent("swiperight", node, firstTouch, lastTouch);
    }

    static swipeRightEnd(node: HTMLElement, firstTouch: PageCoordinate, lastTouch: PageCoordinate) {
        Utils._fireSwipeEvent("swiperightend", node, firstTouch, lastTouch);
    }

    static swipeRightCancel(node: HTMLElement, firstTouch: PageCoordinate, lastTouch: PageCoordinate) {
        Utils._fireSwipeEvent("swiperightcancel", node, firstTouch, lastTouch);
    }

    static _fireSwipeEvent(eventName: string, node: HTMLElement, firstTouch: PageCoordinate, lastTouch: PageCoordinate) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            detail: {
                originPageX: firstTouch.pageX,
                originPageY: firstTouch.pageY,
                pageX: lastTouch.pageX,
                pageY: lastTouch.pageY
            }
        });
        node.dispatchEvent(event);
    }
}
