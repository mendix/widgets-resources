import { shallow } from "enzyme";
import { createElement } from "react";

import { Badge } from "../Badge";
import { BadgeProps } from "../Badge";

describe("Badge", () => {
    const createBadge = (props: BadgeProps) => shallow(createElement(Badge, props));

    it("should render the structure", () => {
        const badgeProps: BadgeProps = {
            badgeType: "badge",
            bootstrapStyle: "default",
            onClickAction: jasmine.createSpy("onClick"),
            value: "0"
        };
        const badge = createBadge(badgeProps);

        expect(badge).toBeElement(
            createElement("span",
                {
                    className: ("widget-badge badge label-default"),
                    onClick: jasmine.any(Function) as any,
                    style: badgeProps.style
                }, jasmine.any(String))
        );
    });

    it("should show no value when no value or default value provided", () => {
        const value = "value";
        const badge = createBadge({ badgeType: "label", value, defaultValue: "default value" });

        expect(badge.text()).toBe(value);
    });

    it("should show default value when no value is provided", () => {
        const defaultValue = "default";
        const badge = createBadge({ badgeType: "label", value: undefined, defaultValue });

        expect(badge.text()).toBe(defaultValue);
    });

    it("should show no value when no value or default value provided", () => {
        const badge = createBadge({ badgeType: "label", value: undefined });

        expect(badge.text()).toBe("");
    });

    it("configured as a label should have the class label", () => {
        const badge = createBadge({ badgeType: "label" });

        expect(badge.hasClass("label")).toBe(true);
    });

    it("configured as a badge should have the class badge", () => {
        const badge = createBadge({ badgeType: "badge" });

        expect(badge.hasClass("badge")).toBe(true);
    });

    it("with a click action should respond to click events", () => {
        const badgeProps: BadgeProps = { onClickAction: jasmine.createSpy("onClick"), badgeType: "badge" };
        const onClick = badgeProps.onClickAction = jasmine.createSpy("onClick");
        const badge = createBadge(badgeProps);

        badge.simulate("click");

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("with the Bootstrap style default should have the class label-default", () => {
        const badge = createBadge({ bootstrapStyle: "default", badgeType: "badge" });

        expect(badge.hasClass("label-default")).toBe(true);
    });

    it("with the Bootstrap style primary should have the class label-primary", () => {
        const badge = createBadge({ bootstrapStyle: "primary", badgeType: "badge" });

        expect(badge.hasClass("label-primary")).toBe(true);
    });

    it("with the Bootstrap style success should have the class label-success", () => {
        const badge = createBadge({ bootstrapStyle: "success", badgeType: "badge" });

        expect(badge.hasClass("label-success")).toBe(true);
    });

    it("with the Bootstrap style info should have the class label-info", () => {
        const badge = createBadge({ bootstrapStyle: "info", badgeType: "badge" });

        expect(badge.hasClass("label-info")).toBe(true);
    });

    it("with the Bootstrap style warning should have the class label-warning", () => {
        const badge = createBadge({ bootstrapStyle: "warning", badgeType: "badge" });

        expect(badge.hasClass("label-warning")).toBe(true);
    });

    it("with the Bootstrap style danger should have the class label-danger", () => {
        const badge = createBadge({ bootstrapStyle: "danger", badgeType: "badge" });

        expect(badge.hasClass("label-danger")).toBe(true);
    });
});
