import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Badge, BadgeProps } from "../Badge";

describe("Badge", () => {
    const createBadge = (props: BadgeProps) => shallow(createElement(Badge, props));

    it("should render the structure", () => {
        const badgeProps: BadgeProps = {
            label: "Custom Label",
            onClickAction: jasmine.createSpy("onClick"),
            value: "0"
        };
        const badge = createBadge(badgeProps);

        expect(badge).toBeElement(
            DOM.div(
                {
                    className: "widget-badge",
                    onClick: jasmine.any(Function) as any
                },
                DOM.span({ className: "widget-badge-text" }, badgeProps.label),
                DOM.span({ className: "widget-badge badge label-default" }, badgeProps.value)
            )
        );
    });

    it("with a click action should respond to click events", () => {
        const badgeProps: BadgeProps = { onClickAction: jasmine.createSpy("onClick") };
        const onClick = badgeProps.onClickAction = jasmine.createSpy("onClick");
        const badge = createBadge(badgeProps);

        badge.simulate("click");

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("with the Bootstrap style default should have the class label-default", () => {
        const badgeProps: BadgeProps = { bootstrapStyle: "default" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-default")).toBe(true);
    });

    it("with the Bootstrap style primary should have the class label-primary", () => {
        const badgeProps: BadgeProps = { bootstrapStyle: "primary" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-primary")).toBe(true);
    });

    it("with the Bootstrap style success should have the class label-success", () => {
        const badgeProps: BadgeProps = { bootstrapStyle: "success" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-success")).toBe(true);
    });

    it("with the Bootstrap style info should have the class label-info", () => {
        const badgeProps: BadgeProps = { bootstrapStyle: "info" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-info")).toBe(true);
    });

    it("with the Bootstrap style warning should have the class label-warning", () => {
        const badgeProps: BadgeProps = { bootstrapStyle: "warning" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-warning")).toBe(true);
    });

    it("with the Bootstrap style danger should have the class label-danger", () => {
        const badgeProps: BadgeProps = { bootstrapStyle: "danger" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-danger")).toBe(true);
    });
});
