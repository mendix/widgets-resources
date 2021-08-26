import { renderHook } from "@testing-library/react-hooks";
import { usePositionObserver } from "../usePositionObserver";
import { act } from "react-test-renderer";
import React from "react";
import { shallow } from "enzyme";

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

        const { result } = renderHook(() => usePositionObserver(target));
        act(() => {
            const component = shallow(result.current[1]);
            expect(component).toBeDefined();
        });

        expect(setHookValue).toBeCalledWith({ top: 1, right: 2, bottom: 3, left: 4 });
        expect(result.current[1]).toBeDefined();
    });
});
