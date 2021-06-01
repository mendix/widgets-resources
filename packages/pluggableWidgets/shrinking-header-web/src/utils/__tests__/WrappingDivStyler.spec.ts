import { act, renderHook } from "@testing-library/react-hooks";
import { useWrappingDivHeight } from "../WrappingDivStyler";
import { mockResizeObserver } from "./ResizeObserverMock";

let lastMockedResizeObserver: ResizeObserver & { notifyChange: () => void };

mockResizeObserver(act, _lastMockedResizeObserver => {
    lastMockedResizeObserver = _lastMockedResizeObserver;
});

describe("useWrappingDivHeight", () => {
    describe("with header element provided", () => {
        let defaultHeaderElement: { offsetHeight: number };

        beforeEach(() => {
            defaultHeaderElement = { offsetHeight: 175 };
        });

        it("returns the wrapping div height", () => {
            const renderedHook = renderHook(defaultHeaderElement => useWrappingDivHeight(defaultHeaderElement), {
                initialProps: defaultHeaderElement as HTMLElement
            });

            expect(renderedHook.result.current).toBe(175);
        });
        it("updates the wrapping div height only when header element height increases", () => {
            const renderedHook = renderHook(defaultHeaderElement => useWrappingDivHeight(defaultHeaderElement), {
                initialProps: defaultHeaderElement as HTMLElement
            });

            expect(renderedHook.result.current).toBe(175);

            defaultHeaderElement.offsetHeight = 180;
            lastMockedResizeObserver.notifyChange();
            expect(renderedHook.result.current).toBe(180);

            defaultHeaderElement.offsetHeight = 150;
            lastMockedResizeObserver.notifyChange();
            expect(renderedHook.result.current).toBe(180);
        });
        it("stops observing changes when header element has changed", async () => {
            const otherHeaderElement = { offsetHeight: 100 } as HTMLElement;
            const renderedHook = renderHook(defaultHeaderElement => useWrappingDivHeight(defaultHeaderElement), {
                initialProps: defaultHeaderElement as HTMLElement
            });

            const firstMockedResizeObserver = lastMockedResizeObserver;
            expect(firstMockedResizeObserver.observe).toHaveBeenCalledTimes(1);

            renderedHook.rerender(otherHeaderElement);
            expect(firstMockedResizeObserver.disconnect).toHaveBeenCalledTimes(1);
        });
    });
    describe("without header element provided", () => {
        it("returns undefined", () => {
            const renderedHook = renderHook(() => useWrappingDivHeight());

            expect(renderedHook.result.current).toBeUndefined();
        });
    });
});
