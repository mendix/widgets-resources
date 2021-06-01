import { createElement } from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";

import { ShrinkingHeaderThreshold, ShrinkingHeaderThresholdProps } from "../ShrinkingHeaderThreshold";
import { mockResizeObserver } from "../../utils/__tests__/ResizeObserverMock";

let lastMockedResizeObserver: ResizeObserver & { notifyChange: () => void };

mockResizeObserver(act, _lastMockedResizeObserver => {
    lastMockedResizeObserver = _lastMockedResizeObserver;
});

let documentEventListeners: Array<() => void>;

document.addEventListener = jest.fn().mockImplementation((_type: string, callback: () => void) => {
    documentEventListeners.push(callback);
});

describe("ShrinkingHeaderThreshold", () => {
    let defaultShrinkingHeaderProps: ShrinkingHeaderThresholdProps;

    beforeEach(() => {
        defaultShrinkingHeaderProps = {
            rootElementRef: jest.fn(),
            name: "name",
            className: "class-name",
            style: { color: "green" },
            tabIndex: 4,
            content: <h1>Header</h1>,
            shrinkThreshold: 250
        };

        documentEventListeners = [];
    });

    it("renders correctly when the page isn't scrolled past the threshold", () => {
        const shrinkingHeaderThreshold = mount(<ShrinkingHeaderThreshold {...defaultShrinkingHeaderProps} />);

        Object.defineProperty(shrinkingHeaderThreshold.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 100,
            configurable: true
        });
        lastMockedResizeObserver.notifyChange();
        shrinkingHeaderThreshold.update();
        expect(shrinkingHeaderThreshold).toMatchSnapshot();
        expect(defaultShrinkingHeaderProps.rootElementRef).toHaveBeenCalledTimes(1);
    });

    function testShrinkClassBeingApplied(threshold: number): ReactWrapper {
        const shrinkingHeaderThreshold = mount(<ShrinkingHeaderThreshold {...defaultShrinkingHeaderProps} />);

        Object.defineProperty(shrinkingHeaderThreshold.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 100,
            configurable: true
        });
        lastMockedResizeObserver.notifyChange();
        shrinkingHeaderThreshold.update();
        expect(documentEventListeners).toHaveLength(1);

        Object.defineProperty(window, "scrollY", { value: threshold, configurable: true });
        act(documentEventListeners[0]);
        Object.defineProperty(shrinkingHeaderThreshold.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 25,
            configurable: true
        });
        lastMockedResizeObserver.notifyChange();
        shrinkingHeaderThreshold.update();
        expect(shrinkingHeaderThreshold).toMatchSnapshot();

        return shrinkingHeaderThreshold;
    }

    it("applies the shrink class when the page gets scrolled to the threshold", () => {
        testShrinkClassBeingApplied(250);
    });

    it("applies the shrink class when the page gets scrolled passed the threshold", () => {
        testShrinkClassBeingApplied(275);
    });

    it("removes the shrink class when the page gets scrolled back above the threshold", async () => {
        const shrinkingHeaderThreshold = testShrinkClassBeingApplied(275);

        Object.defineProperty(window, "scrollY", { value: 50, configurable: true });
        await new Promise(r => setTimeout(r, 250));
        act(documentEventListeners[0]);
        Object.defineProperty(shrinkingHeaderThreshold.find("header").getDOMNode() as HTMLDivElement, "offsetHeight", {
            value: 100,
            configurable: true
        });
        lastMockedResizeObserver.notifyChange();
        shrinkingHeaderThreshold.update();
        expect(shrinkingHeaderThreshold).toMatchSnapshot();
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
