import { createElement } from "react";
import { Toggle } from "../Toggle";
import { mount, render } from "enzyme";

describe("Sidebar toggle", () => {
    describe("rendering", () => {
        it("renders correctly as a link", () => {
            const toggle = render(<Toggle className="" render="link" role="button" />);

            expect(toggle).toMatchSnapshot();
        });

        it("renders correctly as a button", () => {
            const toggle = render(<Toggle className="" render="button" />);

            expect(toggle).toMatchSnapshot();
        });

        it("renders correctly with an icon", () => {
            const toggle = render(
                <Toggle className="" render="button" icon={{ type: "glyph", iconClass: "hamburger" }} />
            );

            expect(toggle).toMatchSnapshot();
        });

        it("renders correctly with a tooltip and caption", () => {
            const toggle = render(<Toggle className="" render="button" tooltip="this is a toggle" caption="menu" />);

            expect(toggle).toMatchSnapshot();
        });
    });

    describe("behaviors", () => {
        it("calls correct event when pressing link", () => {
            const fn = jest.fn();
            const toggle = mount(<Toggle className="" render="link" role="button" />);

            document.addEventListener("toggleSidebar", fn);

            toggle.simulate("click");

            expect(fn).toBeCalled();
        });

        it("calls correct event when pressing button", () => {
            const fn = jest.fn();
            const toggle = mount(<Toggle className="" render="button" />);

            document.addEventListener("toggleSidebar", fn);

            toggle.simulate("click");

            expect(fn).toBeCalled();
        });

        it("calls correct event when pressing enter over a link", () => {
            const fn = jest.fn();
            const toggle = mount(<Toggle className="" render="link" role="button" />);

            document.addEventListener("toggleSidebar", fn);

            toggle.simulate("keydown", {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                key: "Enter"
            });

            expect(fn).toBeCalled();
        });

        it("calls correct event when pressing enter over a button", () => {
            const fn = jest.fn();
            const toggle = mount(<Toggle className="" render="button" />);

            document.addEventListener("toggleSidebar", fn);

            toggle.simulate("keydown", {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
                key: "Enter"
            });

            expect(fn).toBeCalled();
        });
    });

    describe("structure", () => {
        it("contains custom classes", () => {
            const toggle = mount(<Toggle className="custom-class" render="button" />);

            expect(toggle.find("button").prop("className")).toContain("custom-class");
        });

        it("applies correct role to links", () => {
            const toggle = mount(<Toggle className="" render="link" role="my_underscored_role" />);

            expect(toggle.find("a").prop("role")).toContain("my-underscored-role");
        });
    });
});
