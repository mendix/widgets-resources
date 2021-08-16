import { createElement } from "react";
import { mount } from "enzyme";

import { Sidebar, SidebarProps } from "../Sidebar";

import { act } from "react-dom/test-utils";

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

    it("is toggleable when collapsible", () => {
        const sidebarWrapper = mount(<Sidebar {...defaultSidebarProps} />);

        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).className).not.toContain(
            "widget-sidebar-expanded"
        );

        act(() => {
            document.dispatchEvent(new CustomEvent("toggleSidebar"));
        });

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

        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).className).not.toContain(
            "widget-sidebar-expanded"
        );
        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).style.width).toBe("500px");

        act(() => {
            document.dispatchEvent(new CustomEvent("toggleSidebar"));
        });

        sidebarWrapper.update();
        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).className).not.toContain(
            "widget-sidebar-expanded"
        );
        expect((sidebarWrapper.find("aside").getDOMNode() as HTMLElement).style.width).toBe("500px");
    });
});
