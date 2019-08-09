import { ShallowWrapper, shallow } from "enzyme";
import { createElement } from "react";
import classNames from "classnames";

import { BadgeButton, BadgeButtonProps } from "../BadgeButton";

describe("BadgeButton", () => {
    const createBadgeButton = (
        props: BadgeButtonProps
    ): ShallowWrapper<BadgeButtonProps, Readonly<{}>, React.Component<{}, {}, any>> =>
        shallow(createElement(BadgeButton, props));

    it("should render the structure", () => {
        const badgeProps: BadgeButtonProps = {
            label: "Custom Label",
            onClickAction: expect.any(Function),
            value: "0"
        };
        const badge = createBadgeButton(badgeProps);

        expect(badge.getElement()).toEqual(
            createElement(
                "button",
                {
                    className: classNames("widget-badge-button btn", {
                        [`btn-${badgeProps.bootstrapStyle}`]: !!badgeProps.bootstrapStyle
                    }),
                    onClick: expect.any(Function)
                },
                createElement("span", { className: "widget-badge-button-text" }, badgeProps.label),
                createElement("span", { className: "badge" }, badgeProps.value)
            )
        );
    });

    it("with a click action should respond to click events", () => {
        const badgeProps: BadgeButtonProps = { onClickAction: jasmine.createSpy("onClick") };
        const badge = createBadgeButton(badgeProps);

        badge.simulate("click");

        expect(badgeProps.onClickAction).toHaveBeenCalled();
    });

    it("with the bootstrap style default should have the class btn-default", () => {
        const badgeComponent = createBadgeButton({ bootstrapStyle: "default" });

        expect(badgeComponent.hasClass("btn-default")).toBe(true);
    });

    it("with the bootstrap style primary should have the class btn-primary", () => {
        const badgeComponent = createBadgeButton({ bootstrapStyle: "primary" });

        expect(badgeComponent.hasClass("btn-primary")).toBe(true);
    });

    it("with the bootstrap style success should have the class btn-success", () => {
        const badgeComponent = createBadgeButton({ bootstrapStyle: "success" });

        expect(badgeComponent.hasClass("btn-success")).toBe(true);
    });

    it("with the bootstrap style info should have the class btn-info", () => {
        const badgeComponent = createBadgeButton({ bootstrapStyle: "info" });

        expect(badgeComponent.hasClass("btn-info")).toBe(true);
    });

    it("with the bootstrap style warning should have the class btn-warning", () => {
        const badgeComponent = createBadgeButton({ bootstrapStyle: "warning" });

        expect(badgeComponent.hasClass("btn-warning")).toBe(true);
    });

    it("with the bootstrap style danger should have the class btn-danger", () => {
        const badgeComponent = createBadgeButton({ bootstrapStyle: "danger" });

        expect(badgeComponent.hasClass("btn-danger")).toBe(true);
    });
});
