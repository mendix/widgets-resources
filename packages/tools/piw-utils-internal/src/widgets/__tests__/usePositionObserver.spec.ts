import { renderHook } from "@testing-library/react-hooks";
import { usePositionObserver } from "../usePositionObserver";
import React from "react";

describe("Position Observer", () => {
    it("Defines the AnimationFrameHandler", () => {
        const target = document.createElement("div");
        let hookValue = { top: 0, right: 0, bottom: 0, left: 0 };
        const setHookValue = jest.fn(value => (hookValue = value));

        // @ts-ignore
        jest.spyOn(target, "getBoundingClientRect").mockImplementation(() => ({
            top: 1,
            right: 2,
            bottom: 3,
            left: 4
        }));
        jest.spyOn(React, "useState").mockImplementation(() => [hookValue, setHookValue]);
        jest.spyOn(window, "requestAnimationFrame").mockImplementation(() => {
            setHookValue({ top: 1, right: 2, bottom: 3, left: 4 });
            return 1;
        });

        const { result } = renderHook(() => usePositionObserver(target, true));

        expect(result.current).toStrictEqual({ top: 0, right: 0, bottom: 0, left: 0 });
        expect(setHookValue).toBeCalledWith({ top: 1, right: 2, bottom: 3, left: 4 });
    });
});
