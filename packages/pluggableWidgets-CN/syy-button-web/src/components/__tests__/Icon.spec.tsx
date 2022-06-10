import { createElement } from "react";
import { mount, render } from "enzyme";
import { Icon, IconProps } from "../Icon";

describe("Icon", () => {
    let defaultIconProps: IconProps;

    beforeEach(() => {
        defaultIconProps = {
            data: { type: "glyph", iconClass: "icon-class" },
            animate: true
        };
    });

    it("renders glyph icons", () => {
        const iconWrapper = render(<Icon {...defaultIconProps} />);

        expect(iconWrapper).toMatchSnapshot();
    });

    it("renders image icons", () => {
        const iconWrapper = render(<Icon {...defaultIconProps} data={{ type: "image", iconUrl: "icon.url" }} />);

        expect(iconWrapper).toMatchSnapshot();
    });

    it("renders a default icon", () => {
        const iconWrapper = render(<Icon {...defaultIconProps} data={undefined} />);

        expect(iconWrapper).toMatchSnapshot();
    });

    it("doesn't render an icon with an unknown icon data type", () => {
        const iconWrapper = render(<Icon {...defaultIconProps} data={{ type: "unknown" } as any} />);

        expect(iconWrapper).toMatchSnapshot();
    });

    it("doesn't apply an animate class to a glyph icon when animate is false", () => {
        const iconWrapper = mount(<Icon {...defaultIconProps} animate={false} />);

        expect(iconWrapper.find("span").prop("className")).not.toContain("animate");
    });

    it("doesn't apply an animate class to an image icon when animate is false", () => {
        const iconWrapper = mount(
            <Icon {...defaultIconProps} data={{ type: "image", iconUrl: "icon.url" }} animate={false} />
        );

        expect(iconWrapper.find("img").prop("className")).not.toContain("animate");
    });

    it("doesn't apply an animate class to a default icon when animate is false", () => {
        const iconWrapper = mount(<Icon {...defaultIconProps} data={undefined} animate={false} />);
        expect(iconWrapper.find("div").prop("className")).not.toContain("animate");
    });
});
