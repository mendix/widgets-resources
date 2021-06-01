/* istanbul ignore file */

export function mockResizeObserver(
    act: Function,
    setLastMockedResizeObserver?: (lastMockedResizeObserver: ResizeObserver & { notifyChange: () => void }) => void
): void {
    window.ResizeObserver = jest.fn().mockImplementation((callback: () => void) => {
        const lastMockedResizeObserver = {
            observe: jest.fn().mockImplementation(() => act(() => callback())),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
            notifyChange: () => act(() => callback()) // specific mock function to mimic observe behavior
        };
        setLastMockedResizeObserver?.(lastMockedResizeObserver);
        return lastMockedResizeObserver;
    });
}
