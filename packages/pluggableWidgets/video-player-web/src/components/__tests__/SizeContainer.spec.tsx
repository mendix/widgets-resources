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
        width: 100,
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

    it("renders correctly with pixel width & height unit percentage of width", () => {
        const sizeContainer = create(
            <SizeContainer {...defaultProps} widthUnit="pixels" heightUnit="percentageOfWidth" />
        ).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit percentage of parent", () => {
        const sizeContainer = create(<SizeContainer {...defaultProps} heightUnit="percentageOfParent" />).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit aspect ratio 1:1", () => {
        const sizeContainer = create(
            <SizeContainer {...defaultProps} heightUnit="aspectRatio" height={undefined} heightAspectRatio="oneByOne" />
        ).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit aspect ratio 4:3", () => {
        const sizeContainer = create(
            <SizeContainer
                {...defaultProps}
                heightUnit="aspectRatio"
                height={undefined}
                heightAspectRatio="fourByThree"
            />
        ).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit aspect ratio 3:2", () => {
        const sizeContainer = create(
            <SizeContainer
                {...defaultProps}
                heightUnit="aspectRatio"
                height={undefined}
                heightAspectRatio="threeByTwo"
            />
        ).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit aspect ratio 16:9", () => {
        const sizeContainer = create(
            <SizeContainer
                {...defaultProps}
                heightUnit="aspectRatio"
                height={undefined}
                heightAspectRatio="sixteenByNine"
            />
        ).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with height unit aspect ratio 21:9", () => {
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

    it("renders correctly with height unit aspect ratio & any width", () => {
        const sizeContainer = create(
            <SizeContainer
                {...defaultProps}
                width={68}
                heightUnit="aspectRatio"
                height={undefined}
                heightAspectRatio="TwentyOneByNine"
            />
        ).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });

    it("renders correctly with pixel width & height unit aspect ratio", () => {
        const sizeContainer = create(
            <SizeContainer
                {...defaultProps}
                widthUnit="pixels"
                heightUnit="aspectRatio"
                height={undefined}
                heightAspectRatio="TwentyOneByNine"
            />
        ).toJSON();

        expect(sizeContainer).toMatchSnapshot();
    });
});
