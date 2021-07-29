import { createElement } from "react";
import { mount } from "enzyme";

import { Sidebar, SidebarProps } from "../Sidebar";

jest.mock("../../utils/SidebarRegistration");
import { registerSidebar as mockedRegisterSidebar, SidebarRegistration } from "../../utils/SidebarRegistration";
import { act } from "react-dom/test-utils";
const { registerSidebar } = jest.requireActual("../../utils/SidebarRegistration");

(mockedRegisterSidebar as any).mockImplementation((sidebarRegistration: SidebarRegistration) =>
    registerSidebar(sidebarRegistration)
);

describe("Sidebar", () => {
    let defaultSidebarProps: SidebarProps;

    beforeEach(() => {
        defaultSidebarProps = {
            name: "Sidebar",
            className: "sidebar-left",
            style: {
                backgroundColor: "blue"
            },
            tabIndex: 1,
            collapsible: true,
            startExpanded: false,
            expandedWidth: 400
        };
    });

    afterEach(() => {
        (window as any)["com.mendix.widgets.web.sidebar.register"] = undefined;
    });

    it("renders starting collapsed", () => {
        const SidebarWrapper = mount(<Sidebar {...defaultSidebarProps} />);

        expect(SidebarWrapper.getDOMNode()).toMatchSnapshot();
    });

    it("renders starting expanded", () => {
        const SidebarWrapper = mount(<Sidebar {...defaultSidebarProps} startExpanded />);

        expect(SidebarWrapper.getDOMNode()).toMatchSnapshot();
    });

    it("renders with slide over mode", () => {
        const SidebarWrapper = mount(<Sidebar {...defaultSidebarProps} slideOver />);

        expect(SidebarWrapper.getDOMNode()).toMatchSnapshot();
    });

    it("renders with collapsed width", () => {
        const SidebarWrapper = mount(<Sidebar {...defaultSidebarProps} collapsedWidth={100} expandedWidth={500} />);

        expect(SidebarWrapper.getDOMNode()).toMatchSnapshot();
    });

    it("renders an alert in the case of a failure", () => {
        (mockedRegisterSidebar as any).mockImplementationOnce(() => {
            throw Error("Error message");
        });
        const SidebarWrapper = mount(<Sidebar {...defaultSidebarProps} />);

        expect(SidebarWrapper.getDOMNode()).toMatchSnapshot();
    });

    it("is toggleable when collapsible", () => {
        const sidebarWrapper = mount(<Sidebar {...defaultSidebarProps} />);

        (window as any)["com.mendix.widgets.web.sidebar.register"].forEach((toggleSidebar: () => void) =>
            act(() => {
                toggleSidebar();
            })
        );

        sidebarWrapper.update();
        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).className).toContain(
            "widget-sidebar-expanded"
        );
        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).style.width).toBe("400px");
    });

    it("isn't toggleable when not collapsible", () => {
        const sidebarWrapper = mount(
            <Sidebar {...defaultSidebarProps} collapsible={false} expandedWidth={undefined} width={500} />
        );

        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).style.width).toBe("500px");

        (window as any)["com.mendix.widgets.web.sidebar.register"]?.forEach((toggleSidebar: () => void) =>
            act(() => {
                toggleSidebar();
            })
        );

        sidebarWrapper.update();
        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).className).not.toContain(
            "widget-sidebar-expanded"
        );
        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).style.width).toBe("500px");
    });

    // TODO: enable this test after upgrading the enzyme-adapter-react-17 dep to the latest version, since this will call the useEffect cleanup function
    xit("cleans up", () => {
        const sidebarWrapper = mount(<Sidebar {...defaultSidebarProps} />);

        expect((window as any)["com.mendix.widgets.web.sidebar.register"].has(defaultSidebarProps.name)).toBe(true);

        sidebarWrapper.unmount();
        expect((window as any)["com.mendix.widgets.web.sidebar.register"].has(defaultSidebarProps.name)).toBe(false);
    });
});
