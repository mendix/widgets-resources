import { registerSidebarToggle } from "../SidebarToggleRegistration";

describe("registerSidebarToggle", () => {
    const sidebarToggleLocation = "com.mendix.widgets.web.sidebar.toggle";

    afterEach(() => {
        (window as any)[sidebarToggleLocation] = undefined;
    });

    it("adds the toggle to the window", () => {
        const func = jest.fn();
        registerSidebarToggle(func);
        expect((window as any)[sidebarToggleLocation]).toBe(func);
    });

    it("returns a function that removes the toggle from the window", () => {
        const func = jest.fn();
        const unregisterSidebarToggle = registerSidebarToggle(func);

        expect((window as any)[sidebarToggleLocation]).toBe(func);

        unregisterSidebarToggle();
        expect((window as any)[sidebarToggleLocation]).toBe(undefined);
    });

    it("gives an error when a toggle is already set on the window", () => {
        registerSidebarToggle(jest.fn());
        expect(() => registerSidebarToggle(jest.fn())).toThrow();
    });
});
