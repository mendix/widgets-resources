import { createElement } from "react";
import { render } from "react-native-testing-library";
import { IntroScreens } from "../IntroScreens";
import { IntroScreensProps } from "../../typings/IntroScreensProps";
import { IntroScreensStyle } from "../ui/Styles";
import { View } from "react-native";

jest.mock("mendix/components/native/Icon", () => require.requireActual("./__mocks__/mendix/components/native/Icon"));

jest.mock("react-native-device-info", () => ({
    hasNotch: jest.fn()
}));

describe("Intro Screens", () => {
    let defaultProps: IntroScreensProps<IntroScreensStyle>;

    beforeEach(() => {
        defaultProps = {
            name: "introscreens",
            slides: [
                {
                    name: "Page 1",
                    content: <View />
                }
            ],
            mode: "fullscreen",
            showPagination: true,
            showBottomButtons: false,
            showDoneButton: true,
            showNextButton: true,
            showPrevButton: false,
            showSkipButton: false,
            numberOfButtons: "one",
            style: []
        };
    });

    it("renders", () => {
        const component = render(<IntroScreens {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with 1 bottom button", () => {
        const component = render(<IntroScreens {...defaultProps} showBottomButtons={true} numberOfButtons={"one"} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with 2 bottom button", () => {
        const component = render(<IntroScreens {...defaultProps} showBottomButtons={true} numberOfButtons={"two"} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
