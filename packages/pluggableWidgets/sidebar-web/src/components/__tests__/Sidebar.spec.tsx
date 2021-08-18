import React, { createElement } from "react";
import { mount, render } from "enzyme";

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

    describe("rendering", () => {
        it("renders starting collapsed", () => {
            const sidebar = render(<Sidebar {...defaultSidebarProps} />);

            expect(sidebar).toMatchSnapshot();
        });

        it("renders starting expanded", () => {
            const sidebar = render(<Sidebar {...defaultSidebarProps} startExpanded />);

            expect(sidebar).toMatchSnapshot();
        });

        it("renders with slide over mode", () => {
            const sidebar = render(<Sidebar {...defaultSidebarProps} slideOver />);

            expect(sidebar).toMatchSnapshot();
        });

        it("renders with collapsed width", () => {
            const sidebar = render(<Sidebar {...defaultSidebarProps} collapsedWidth={100} expandedWidth={500} />);

            expect(sidebar).toMatchSnapshot();
        });
    });

    describe("behaviors", () => {
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

        it("applies correct aria tags when collapsed", () => {
            const mockedNavigationTree = {
                setAttribute: jest.fn()
            };
            jest.spyOn(React, "useRef").mockReturnValue({
                current: {
                    querySelectorAll: () => [mockedNavigationTree]
                }
            });

            render(
                <Sidebar {...defaultSidebarProps} collapsible collapsedWidth={52} slideOver={false} width={undefined} />
            );

            expect(mockedNavigationTree.setAttribute).toBeCalledWith("aria-hidden", "true");
            expect(mockedNavigationTree.setAttribute).toBeCalledWith("data-focusindex", "-1");
        });

        it("applies correct aria tags when expanded", () => {
            const mockedNavigationTree = {
                setAttribute: jest.fn(),
                removeAttribute: jest.fn()
            };
            jest.spyOn(React, "useRef").mockReturnValue({
                current: {
                    querySelectorAll: () => [mockedNavigationTree]
                }
            });

            render(
                <Sidebar
                    {...defaultSidebarProps}
                    collapsible
                    collapsedWidth={52}
                    slideOver={false}
                    width={undefined}
                    startExpanded
                />
            );

            expect(mockedNavigationTree.removeAttribute).toBeCalledWith("aria-hidden");
            expect(mockedNavigationTree.setAttribute).toBeCalledWith("data-focusindex", "0");
        });
    });
});
