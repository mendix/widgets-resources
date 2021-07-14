import { createElement, PropsWithChildren } from "react";
import { shallow } from "enzyme";

import { Header, HeaderProps } from "../Header";

describe("Header", () => {
    let defaultHeaderProps: PropsWithChildren<HeaderProps>;

    beforeEach(() => {
        defaultHeaderProps = {
            heading: "headingThree",
            children: "Text"
        };
    });

    it("renders h1", () => {
        const headerWrapper = shallow(<Header {...defaultHeaderProps} heading="headingOne" />);

        expect(headerWrapper).toMatchSnapshot();
    });

    it("renders h2", () => {
        const headerWrapper = shallow(<Header {...defaultHeaderProps} heading="headingTwo" />);

        expect(headerWrapper).toMatchSnapshot();
    });

    it("renders h3", () => {
        const headerWrapper = shallow(<Header {...defaultHeaderProps} />);

        expect(headerWrapper).toMatchSnapshot();
    });

    it("renders h4", () => {
        const headerWrapper = shallow(<Header {...defaultHeaderProps} heading="headingFour" />);

        expect(headerWrapper).toMatchSnapshot();
    });

    it("renders h5", () => {
        const headerWrapper = shallow(<Header {...defaultHeaderProps} heading="headingFive" />);

        expect(headerWrapper).toMatchSnapshot();
    });

    it("renders h6", () => {
        const headerWrapper = shallow(<Header {...defaultHeaderProps} heading="headingSix" />);

        expect(headerWrapper).toMatchSnapshot();
    });
});
