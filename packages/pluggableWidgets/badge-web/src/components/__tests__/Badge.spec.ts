import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { Badge, BadgeProps } from "../Badge";

describe("Badge", () => {
    const createBadge = (props: BadgeProps): ShallowWrapper<any, any> => shallow(createElement(Badge, props));

    it("should render the structure", () => {
        const badgeProps: BadgeProps = {
            type: "badge",
            brandStyle: "default",
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
        const badge = createBadge({ type: "label", value });

        expect(badge.text()).toBe(value);
    });

    it("should show no value when no empty string is passed", () => {
        const badge = createBadge({ type: "label", value: "" });

        expect(badge.text()).toBe("");
    });

    it("configured as a label should have the class label", () => {
        const badge = createBadge({ type: "label", value: "" });

        expect(badge.hasClass("label")).toBe(true);
    });

    it("configured as a badge should have the class badge", () => {
        const badge = createBadge({ type: "badge", value: "" });

        expect(badge.hasClass("badge")).toBe(true);
    });

    it("with a click action should respond to click events", () => {
        const badgeProps: BadgeProps = { onClick: jest.fn(), type: "badge", value: "" };
        const onClick = (badgeProps.onClick = jest.fn());
        const badge = createBadge(badgeProps);

        badge.simulate("click");

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("with the Bootstrap style default should have the class label-default", () => {
        const badge = createBadge({ brandStyle: "default", type: "badge", value: "" });

        expect(badge.hasClass("label-default")).toBe(true);
    });

    it("with the Bootstrap style primary should have the class label-primary", () => {
        const badge = createBadge({ brandStyle: "primary", type: "badge", value: "" });

        expect(badge.hasClass("label-primary")).toBe(true);
    });

    it("with the Bootstrap style success should have the class label-success", () => {
        const badge = createBadge({ brandStyle: "success", type: "badge", value: "" });

        expect(badge.hasClass("label-success")).toBe(true);
    });

    it("with the Bootstrap style info should have the class label-info", () => {
        const badge = createBadge({ brandStyle: "info", type: "badge", value: "" });

        expect(badge.hasClass("label-info")).toBe(true);
    });

    it("with the Bootstrap style warning should have the class label-warning", () => {
        const badge = createBadge({ brandStyle: "warning", type: "badge", value: "" });

        expect(badge.hasClass("label-warning")).toBe(true);
    });

    it("with the Bootstrap style danger should have the class label-danger", () => {
        const badge = createBadge({ brandStyle: "danger", type: "badge", value: "" });

        expect(badge.hasClass("label-danger")).toBe(true);
    });

    it("with the Bootstrap style inverse should have the class label-inverse", () => {
        const badge = createBadge({ brandStyle: "inverse", type: "badge", value: "" });

        expect(badge.hasClass("label-inverse")).toBe(true);
    });
});
