import { createElement } from "react";
import { render } from "react-native-testing-library";
import { IntroScreen } from "../IntroScreen";
import { IntroScreenProps } from "../../typings/IntroScreenProps";
import { IntroScreenStyle } from "../ui/Styles";
import { View } from "react-native";

jest.mock("mendix/components/native/Icon", () => require.requireActual("./__mocks__/mendix/components/native/Icon"));

jest.mock("react-native-device-info", () => ({
    hasNotch: jest.fn()
}));

describe("Intro Screens", () => {
    let defaultProps: IntroScreenProps<IntroScreenStyle>;

    beforeEach(() => {
        defaultProps = {
            name: "introscreens",
            slides: [
                {
                    name: "Page 1",
                    content: <View />
                }
            ],
            buttonPattern: "all",
            showMode: "fullscreen",
            slideIndicators: "between",
            style: []
        };
    });

    it("renders", () => {
        const component = render(<IntroScreen {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with 1 bottom button", () => {
        const component = render(
            <IntroScreen {...defaultProps} slideIndicators={"above"} buttonPattern={"next_done"} />
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with 2 bottom button", () => {
        const component = render(<IntroScreen {...defaultProps} slideIndicators={"above"} buttonPattern={"all"} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
