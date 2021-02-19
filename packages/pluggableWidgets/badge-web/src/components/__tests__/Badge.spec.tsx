import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { Badge, BadgeProps } from "../Badge";

describe("Badge", () => {
    const createBadge = (props: BadgeProps): ShallowWrapper<any, any> => shallow(<Badge {...props} />);

    let defaultBadgeProps: BadgeProps;

    beforeEach(() => {
        defaultBadgeProps = {
            type: "badge",
            value: "text"
        };
    });

    it("renders as a badge", () => {
        const badge = createBadge(defaultBadgeProps);

        expect(badge).toMatchSnapshot();
    });

    it("renders as a label", () => {
        defaultBadgeProps.type = "label";
        const badge = createBadge(defaultBadgeProps);

        expect(badge).toMatchSnapshot();
    });

    it("renders when an empty string is passed as value", () => {
        defaultBadgeProps.value = "";
        const badge = createBadge(defaultBadgeProps);

        expect(badge).toMatchSnapshot();
    });

    it("renders as a button like element when onClick function is passed", () => {
        defaultBadgeProps.onClick = jest.fn();
        const badge = createBadge(defaultBadgeProps);

        expect(badge).toMatchSnapshot();
    });

    it("triggers onClick function with a click event", () => {
        defaultBadgeProps.onClick = jest.fn();
        const badge = createBadge(defaultBadgeProps);

        badge.simulate("click");

        expect(defaultBadgeProps.onClick).toHaveBeenCalledTimes(1);
    });

    it("renders as a button like element when onKeyDown function is passed", () => {
        defaultBadgeProps.onKeyDown = jest.fn();
        const badge = createBadge(defaultBadgeProps);

        expect(badge).toMatchSnapshot();
    });

    it("triggers onKeyDown function on key down", () => {
        defaultBadgeProps.onKeyDown = jest.fn();
        const badge = createBadge(defaultBadgeProps);

        badge.simulate("keydown");

        expect(defaultBadgeProps.onKeyDown).toHaveBeenCalledTimes(1);
    });

    it("renders with a tabIndex", () => {
        defaultBadgeProps.tabIndex = 1;
        const badge = createBadge(defaultBadgeProps);

        expect(badge).toMatchSnapshot();
    });

    it("renders custom classes", () => {
        defaultBadgeProps.className = "custom-class";
        const badge = createBadge(defaultBadgeProps);

        expect(badge).toMatchSnapshot();
    });

    it("renders custom styles", () => {
        defaultBadgeProps.style = { padding: 5 };
        const badge = createBadge(defaultBadgeProps);

        expect(badge).toMatchSnapshot();
    });
});
