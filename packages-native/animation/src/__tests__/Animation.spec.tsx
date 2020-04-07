import { Big } from "big.js";
import { createElement } from "react";
import { Text } from "react-native";
import { render } from "react-native-testing-library";

import { Animation, Props } from "../Animation";

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
    OS: "ios",
    select: jest.fn(dict => dict.ios)
}));

const textContent = <Text>Hello</Text>;

const defaultProps: Props = {
    name: "animation-test",
    content: textContent,
    animationType: "in",
    animationIn: "none",
    animationAttention: "none",
    animationOut: "none",
    duration: new Big(100),
    delay: new Big(0),
    easing: "ease",
    count: new Big(1),
    direction: "normal",
    style: []
};

describe("Animation", () => {
    it("renders", () => {
        const component = render(<Animation {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });
});
