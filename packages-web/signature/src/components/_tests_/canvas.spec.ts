import { shallow } from "enzyme";
import { createElement } from "react";

import { Canvas, CanvasProps } from "../canvas";

describe("Canvas", () => {
    const renderCanvas = (props: CanvasProps) => shallow(createElement(Canvas, props));

    const defaultProps: CanvasProps = {
        width: 500,
        gridx: 50,
        gridy: 50,
        height: 500,
        gridBorder: 1
    };

    it("renders the structure correctly", () => {
        const canvas = renderCanvas(defaultProps);

        expect(canvas).toBeElement(
            createElement("canvas", {
                gridx: defaultProps.gridx,
                gridy: defaultProps.gridy,
                height: defaultProps.height,
                style: { border: defaultProps.gridBorder + "px solid black" },
                width: defaultProps.width
            })
        );
    });
});
