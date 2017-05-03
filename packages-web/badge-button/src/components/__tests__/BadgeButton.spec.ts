import { shallow } from "enzyme";
import { DOM, createElement } from "react";
import * as classNames from "classnames";

import { BadgeButton, BadgeButtonProps } from "../BadgeButton";

describe("BadgeButton", () => {
    const createBadgeButton = (props: BadgeButtonProps) => shallow(createElement(BadgeButton, props));

    it("should render the structure", () => {
        const badgeProps: BadgeButtonProps = {
            label: "Custom Label",
            onClickAction: jasmine.createSpy("onClick"),
            value: "0"
        };
        const badge = createBadgeButton(badgeProps);

        expect(badge).toBeElement(
            createElement("button",
                {
                    className: classNames("widget-badge-button btn",
                        { [`btn-${badgeProps.bootstrapStyle}`]: !!badgeProps.bootstrapStyle }
                    ),
                    onClick: jasmine.any(Function) as any
                },
                DOM.span({ className: "widget-badge-button-text" }, badgeProps.label),
                DOM.span({ className: "badge" }, badgeProps.value)
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
