import { createElement } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import { ShrinkingHeaderLinear, ShrinkingHeaderLinearProps } from "../ShrinkingHeaderLinear";
import { mockResizeObserver } from "../../utils/__tests__/ResizeObserverMock";

let lastMockedResizeObserver: ResizeObserver & { notifyChange: () => void };

mockResizeObserver(act, _lastMockedResizeObserver => {
    lastMockedResizeObserver = _lastMockedResizeObserver;
});

let documentEventListeners: Array<() => void>;

document.addEventListener = jest.fn().mockImplementation((_type: string, callback: () => void) => {
    documentEventListeners.push(callback);
});

describe("ShrinkingHeaderLinear", () => {
    let defaultShrinkingHeaderProps: ShrinkingHeaderLinearProps;

    beforeEach(() => {
        defaultShrinkingHeaderProps = {
            rootElementRef: jest.fn(),
            name: "name",
            className: "class-name",
            style: { color: "green" },
            tabIndex: 4,
            content: <h1>Header</h1>,
            initHeight: 100,
            shrunkHeight: 25
        };

        documentEventListeners = [];
    });

    it("renders correctly", () => {
        const shrinkingHeaderLinear = mount(<ShrinkingHeaderLinear {...defaultShrinkingHeaderProps} />);

        Object.defineProperty(shrinkingHeaderLinear.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 100,
            configurable: true
        });
        lastMockedResizeObserver.notifyChange();
        shrinkingHeaderLinear.update();

        expect(shrinkingHeaderLinear).toMatchSnapshot();
        expect(defaultShrinkingHeaderProps.rootElementRef).toHaveBeenCalledTimes(1);
    });

    it("updates the header & wrapping div height when the page gets scrolled", () => {
        const shrinkingHeaderLinear = mount(<ShrinkingHeaderLinear {...defaultShrinkingHeaderProps} />);

        Object.defineProperty(shrinkingHeaderLinear.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 100,
            configurable: true
        });
        lastMockedResizeObserver.notifyChange();
        shrinkingHeaderLinear.update();
        expect(documentEventListeners).toHaveLength(1);

        Object.defineProperty(window, "scrollY", { value: 25 });
        act(documentEventListeners[0]);
        Object.defineProperty(shrinkingHeaderLinear.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 75,
            configurable: true
        });
        lastMockedResizeObserver.notifyChange();
        shrinkingHeaderLinear.update();
        expect(shrinkingHeaderLinear).toMatchSnapshot();
    });

    it("maintains the shrunk height as the header height when the page gets scrolled", () => {
        const shrinkingHeaderLinear = mount(<ShrinkingHeaderLinear {...defaultShrinkingHeaderProps} />);

        Object.defineProperty(window, "scrollY", { value: 125 });
        act(documentEventListeners[0]);
        shrinkingHeaderLinear.update();
        expect(shrinkingHeaderLinear.find("header").prop("style")).toEqual({ height: 25 });
    });

    // == Unmount doesn't trigger the cleanup function of the useEffect. This could be caused by erroneous code in React 17 as with both Enzyme and React Testing Library the function isn't triggered, even when waiting for it.
    // it("unmounts correctly", () => {
    //     const spy = jest.spyOn(document, "removeEventListener");
    //
    //     const shrinkingHeaderLinear = mount(<ShrinkingHeaderLinear {...defaultShrinkingHeaderProps} />);
    //
    //     expect(documentEventListeners).toHaveLength(1);
    //
    //     shrinkingHeaderLinear.unmount();
    //     expect(spy).toHaveBeenCalledWith("scroll", documentEventListeners[0]);
    // });
});
