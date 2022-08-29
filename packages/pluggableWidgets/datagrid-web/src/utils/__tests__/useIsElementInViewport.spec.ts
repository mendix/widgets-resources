import { renderHook } from "@testing-library/react-hooks";
import { useIsElementInViewport } from "../useIsElementInViewport";

describe("ColumnSelector useIsElementInViewport hook", () => {
    it("Return FALSE as the element is NOT in viewport", () => {
        const { result } = renderHook(useIsElementInViewport, {
            initialProps: {
                current: {
                    getBoundingClientRect: () => {
                        return {
                            width: 0,
                            height: 0,
                            top: -1,
                            left: 0,
                            bottom: 0,
                            right: 0
                        };
                    }
                } as HTMLElement
            }
        });
        expect(result.current).toBe(false);
    });
    it("Return TRUE as the element IS in viewport", () => {
        const { result } = renderHook(useIsElementInViewport, {
            initialProps: {
                current: {
                    getBoundingClientRect: () => {
                        return {
                            width: 0,
                            height: 0,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0
                        };
                    }
                } as HTMLElement
            }
        });
        expect(result.current).toBe(true);
    });
});
