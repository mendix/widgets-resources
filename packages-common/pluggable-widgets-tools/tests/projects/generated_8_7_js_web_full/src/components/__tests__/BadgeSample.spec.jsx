import { createElement } from "react";
import { shallow } from "enzyme";

import { BadgeSample } from "../BadgeSample";

describe("Badge", () => {
    const createBadge = (props) => shallow(<BadgeSample {...props} />);

    it("should render the structure", () => {
        const badgeProps = {
            type: "badge",
            bootstrapStyle: "default",
            value: "0"
        };
        const badge = createBadge(badgeProps);

        expect(
            badge.equals(
                <span className="widget-generated badge label-default">0</span>
            )
        ).toEqual(true);
    });

    it("should show value when no value or default value provided", () => {
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
        const badgeProps = { onClickAction: jasmine.createSpy("onClick"), type: "badge" };
        const onClick = badgeProps.onClickAction = jasmine.createSpy("onClick");
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
