import { ShallowWrapper, shallow } from "enzyme";
import { Component, createElement } from "react";

import { BadgeButton, BadgeButtonProps } from "../BadgeButton";

describe("BadgeButton", () => {
    const createBadgeButton = (
        props: BadgeButtonProps
    ): ShallowWrapper<BadgeButtonProps, Readonly<{}>, Component<{}, {}, any>> =>
        shallow(createElement(BadgeButton, props));

    it("renders the structure correctly", () => {
        const badgeProps: BadgeButtonProps = {
            label: "Custom Label",
            onClick: expect.any(Function),
            value: "0"
        };
        const badge = createBadgeButton(badgeProps);

        expect(badge.getElement()).toEqual(
            createElement(
                "button",
                {
                    className: "widget-badge-button btn btn-primary",
                    onClick: expect.any(Function)
                },
                createElement("span", { className: "widget-badge-button-text" }, badgeProps.label),
                createElement("span", { className: "badge" }, badgeProps.value)
            )
        );
    });

    it("responds to click events", () => {
        const badgeProps: BadgeButtonProps = { onClick: jest.fn() };
        const badge = createBadgeButton(badgeProps);

        badge.simulate("click");

        expect(badgeProps.onClick).toHaveBeenCalled();
    });

    it("renders correctly with custom classes", () => {
        const badgeComponent = createBadgeButton({ className: "btn-secondary" });

        expect(badgeComponent.hasClass("btn btn-secondary")).toBe(true);
    });
});
