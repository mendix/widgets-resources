import { useSidebar } from "../useSidebar";
import { renderHook, act } from "@testing-library/react-hooks";

describe("useSidebar", () => {
    it("starts initially closed", () => {
        const {
            result: { current }
        } = renderHook(() => useSidebar(false));
        expect(current).toBe(false);
    });

    it("starts initially opened", () => {
        const {
            result: { current }
        } = renderHook(() => useSidebar(true));
        expect(current).toBe(true);
    });

    it("toggles value when receiving event", () => {
        const { result } = renderHook(() => useSidebar(false));

        expect(result.current).toBe(false);
        act(() => {
            document.dispatchEvent(new CustomEvent("toggleSidebar"));
        });
        expect(result.current).toBe(true);
    });

    it("toggles value for a specific sidebar id when receiving event", () => {
        const { result } = renderHook(() => useSidebar(false, "my-id"));

        expect(result.current).toBe(false);
        act(() => {
            document.dispatchEvent(new CustomEvent("toggleSidebar", { detail: { id: "my-id" } }));
        });
        expect(result.current).toBe(true);
    });
});
