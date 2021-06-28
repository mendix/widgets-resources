import { createElement, ReactNode } from "react";
import { create } from "react-test-renderer";

import { SizeContainer, SizeProps } from "../SizeContainer";

describe("Size container", () => {
    const defaultProps: SizeProps & { children: ReactNode } = {
        children: <span>Child</span>,
        className: "class-name",
        classNameInner: "class-name-inner",
        style: { backgroundColor: "aqua" },
        tabIndex: 1,
        widthUnit: "percentage",
        width: 50,
        heightUnit: "pixels",
        height: 25
    };

    it("renders correctly with height unit pixels", () => {
        const sizeContainer = create(<SizeContainer {...defaultProps} />).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit percentage of width", () => {
        const sizeContainer = create(<SizeContainer {...defaultProps} heightUnit="percentageOfWidth" />).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit percentage of parent", () => {
        const sizeContainer = create(<SizeContainer {...defaultProps} heightUnit="percentageOfParent" />).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit aspect ratio", () => {
        const sizeContainer = create(
            <SizeContainer
                {...defaultProps}
                heightUnit="aspectRatio"
                height={undefined}
                heightAspectRatio="TwentyOneByNine"
            />
        ).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });
});
