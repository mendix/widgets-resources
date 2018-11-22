import { shallow } from "enzyme";
import { createElement } from "react";

import { SizeContainer, SizeProps } from "../SizeContainer";

const defaultProps: SizeProps = {
    className: "widget-signature",
    classNameInner: "",
    height: 300,
    width: 500,
    heightUnit: "pixels",
    widthUnit: "pixels",
    readOnly: false,
    style: {}
};

describe("Grid", () => {
    const renderGrid = (props: SizeProps) => shallow(createElement(SizeContainer, props));

    it("renders structure correctly", () => {
        const grid = renderGrid(defaultProps);

        expect(grid).toBeElement(
            createElement("div", {
                className: "widget-signature size-box",
                style: {
                    position: "relative", width: "500px", height: "300px"
                }
            }, createElement("div", {
                className: "size-box-inner",
                readOnly: defaultProps.readOnly,
                disabled: defaultProps.readOnly,
                style: {
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0"
                }
            }))
        );
    });

    it("with percentage units renders the structure correctly", () => {
        const grid = renderGrid(defaultProps);
        grid.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage",
            width: 80,
            height: 50
        });

        expect(grid).toBeElement(
            createElement("div", {
                className: "widget-signature size-box",
                style: {
                    position: "relative", width: "80%", height: "auto", paddingBottom: "40%"
                }
            }, createElement("div", {
                className: "size-box-inner",
                readOnly: defaultProps.readOnly,
                disabled: defaultProps.readOnly,
                style: {
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0"
                }
            }))
        );
    });

    it("with percentage of parent units renders the structure correctly", () => {
        const grid = renderGrid(defaultProps);
        grid.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage",
            width: 80,
            height: 50
        });

        expect(grid).toBeElement(
            createElement("div", {
                className: "widget-signature size-box",
                style: {
                    position: "relative", width: "80%", height: "50%"
                }
            }, createElement("div", {
                className: "size-box-inner",
                readOnly: defaultProps.readOnly,
                disabled: defaultProps.readOnly,
                style: {
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0"
                }
            }))
        );
    });

    it("with percentage and pixel units renders the structure correctly", () => {
        const grid = renderGrid(defaultProps);
        grid.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "pixels",
            width: 80,
            height: 50
        });

        expect(grid).toBeElement(
            createElement("div", {
                className: "widget-signature size-box",
                style: {
                    position: "relative", width: "80px", height: "40px"
                }
            }, createElement("div", {
                className: "size-box-inner",
                readOnly: defaultProps.readOnly,
                disabled: defaultProps.readOnly,
                style: {
                    position: "absolute",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0"
                }
            }))
        );
    });
});
