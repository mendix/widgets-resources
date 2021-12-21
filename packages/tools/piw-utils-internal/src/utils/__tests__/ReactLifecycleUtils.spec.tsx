import { createElement } from "react";
import { waitFor, render } from "@testing-library/react";
import { useScheduleUpdateOnce } from "../ReactLifecycleUtils";

function TestComponent({ onRender, predicate }: { onRender: () => void; predicate: () => boolean }): null {
    useScheduleUpdateOnce(predicate);
    onRender();
    return null;
}

describe("ReactLifecycleUtils", () => {
    describe("useScheduleUpdateOnce", () => {
        it("schedule update (rerender) when predicate returns true", async () => {
            const cb = jest.fn();

            expect(cb).toBeCalledTimes(0);
            render(<TestComponent onRender={cb} predicate={() => true} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(2));
        });

        it("do nothing when predicate returns false", async () => {
            const cb = jest.fn();

            expect(cb).toBeCalledTimes(0);
            render(<TestComponent onRender={cb} predicate={() => false} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(1));
            // Checking second time to avoid scheduler order issues
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(1));
        });

        it("schedule update only once", async () => {
            const cb = jest.fn();

            expect(cb).toBeCalledTimes(0);
            const { rerender } = render(<TestComponent onRender={cb} predicate={() => true} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(2));
            rerender(<TestComponent onRender={cb} predicate={() => true} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(3));
        });

        it("can be called many times", async () => {
            const cb = jest.fn();

            const predicate = jest
                .fn()
                .mockImplementationOnce(() => false)
                .mockImplementationOnce(() => false)
                .mockImplementationOnce(() => false)
                .mockImplementationOnce(() => true);

            expect(cb).toBeCalledTimes(0);
            const { rerender } = render(<TestComponent onRender={cb} predicate={predicate} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(1));
            rerender(<TestComponent onRender={cb} predicate={predicate} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(2));
            rerender(<TestComponent onRender={cb} predicate={predicate} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(3));
            rerender(<TestComponent onRender={cb} predicate={predicate} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(5));
            rerender(<TestComponent onRender={cb} predicate={predicate} />);
            await waitFor(() => expect(cb).toHaveBeenCalledTimes(6));
        });
    });
});
