import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { Badge, BadgeProps } from "../Badge";

describe("Badge", () => {
    const createBadge = (props: BadgeProps): ShallowWrapper<any, any> => shallow(createElement(Badge, props));

    it("should render the structure", () => {
        const badgeProps: BadgeProps = {
            type: "badge",
            bootstrapStyle: "default",
            onClick: jest.fn(),
            value: "0"
        };
        const badge = createBadge(badgeProps);

        expect(badge.getElement()).toEqual(
            createElement(
                "span",
                {
                    className: "widget-badge badge label-default",
                    onClick: badgeProps.onClick,
                    style: badgeProps.style
                },
                badgeProps.value
            )
        );
    });

    it("should show value when value is provided", () => {
        const value = "value";
        const badge = createBadge({ type: "label", value, defaultValue: "default value" });

        expect(badge.text()).toBe(value);
    });

    it("should show default value when no value is provided", () => {
        const defaultValue = "default";
        const badge = createBadge({ type: "label", value: undefined, defaultValue });

        expect(badge.text()).toBe(defaultValue);
    });

    it("should show no value when no value or default value provided", () => {
        const badge = createBadge({ type: "label", value: undefined });

        expect(badge.text()).toBe("");
    });

    it("configured as a label should have the class label", () => {
        const badge = createBadge({ type: "label" });

        expect(badge.hasClass("label")).toBe(true);
    });

    it("configured as a badge should have the class badge", () => {
        const badge = createBadge({ type: "badge" });

        expect(badge.hasClass("badge")).toBe(true);
    });

    it("with a click action should respond to click events", () => {
        const badgeProps: BadgeProps = { onClick: jest.fn(), type: "badge" };
        const onClick = (badgeProps.onClick = jest.fn());
        const badge = createBadge(badgeProps);

        badge.simulate("click");

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("with the Bootstrap style default should have the class label-default", () => {
        const badge = createBadge({ bootstrapStyle: "default", type: "badge" });

        expect(badge.hasClass("label-default")).toBe(true);
    });

    it("with the Bootstrap style primary should have the class label-primary", () => {
        const badge = createBadge({ bootstrapStyle: "primary", type: "badge" });

        expect(badge.hasClass("label-primary")).toBe(true);
    });

    it("with the Bootstrap style success should have the class label-success", () => {
        const badge = createBadge({ bootstrapStyle: "success", type: "badge" });

        expect(badge.hasClass("label-success")).toBe(true);
    });

    it("with the Bootstrap style info should have the class label-info", () => {
        const badge = createBadge({ bootstrapStyle: "info", type: "badge" });

        expect(badge.hasClass("label-info")).toBe(true);
    });

    it("with the Bootstrap style warning should have the class label-warning", () => {
        const badge = createBadge({ bootstrapStyle: "warning", type: "badge" });

        expect(badge.hasClass("label-warning")).toBe(true);
    });

    it("with the Bootstrap style danger should have the class label-danger", () => {
        const badge = createBadge({ bootstrapStyle: "danger", type: "badge" });

        expect(badge.hasClass("label-danger")).toBe(true);
    });
});
