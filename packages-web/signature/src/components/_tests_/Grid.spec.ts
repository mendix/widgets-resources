import { shallow } from "enzyme";
import { createElement } from "react";

import { Grid, GridBackgroundProps } from "../Grid";

const defaultProps: GridBackgroundProps = {
    gridCellWidth: 10,
    gridCellHeight: 10,
    gridBorderColor: "blue",
    gridBorderWidth: 1,
    showGrid: true
};

describe("Grid", () => {
    const renderGrid = (props: GridBackgroundProps) => shallow(createElement(Grid, props));

    it("renders the structure correctly", () => {
        const grid = renderGrid(defaultProps);

        expect(grid).toMatchStructure(
            createElement("svg", {
                className: "widget-signature-grid",
                width: "100%", height: "100%", xmlns: "http://www.w3.org/2000/svg"
            })
        );
    });

    it("returns null if show grid is set to false", () => {
        const grid = renderGrid(defaultProps);
        grid.setProps({
            showGrid: false
        });

        expect(grid.getElement()).toEqual(null);
    });
});
