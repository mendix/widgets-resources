import { shallow } from "enzyme";
import { createElement } from "react";

import { Image, ImageProps } from "../image";

describe("Image", () => {
    const renderImage = (props: ImageProps) => shallow(createElement(Image, props));

    const defaultProps: ImageProps = {
        width: 500,
        height: 500,
        gridBorder: 1
    };

    it("renders the structure correctly", () => {
        const canvasImage = renderImage(defaultProps);

        expect(canvasImage).toBeElement(
            createElement("img", {
                className: "image",
                height: defaultProps.height,
                style: { border: defaultProps.gridBorder + "px solid black" },
                width: defaultProps.width
            })
        );
    });
});
