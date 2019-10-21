import { createElement } from "react";
import { render } from "react-native-testing-library";
import { IntroScreen } from "../IntroScreen";
import { IntroScreenProps } from "../../typings/IntroScreenProps";
import { IntroScreenStyle } from "../ui/Styles";
import { View } from "react-native";
import { EditableValueBuilder } from "@native-mobile-resources/util-widgets";
import { Big } from "big.js";

jest.mock("mendix/components/native/Icon", () => require.requireActual("./__mocks__/mendix/components/native/Icon"));

jest.mock("react-native-device-info", () => ({
    hasNotch: jest.fn()
}));

describe("Intro Screen", () => {
    let defaultProps: IntroScreenProps<IntroScreenStyle>;

    beforeEach(() => {
        defaultProps = {
            name: "introscreen",
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
            <IntroScreen {...defaultProps} slideIndicators={"above"} buttonPattern={"nextDone"} />
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with 2 bottom button", () => {
        const component = render(<IntroScreen {...defaultProps} slideIndicators={"above"} buttonPattern={"all"} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with active slide attribute", () => {
        const component = render(
            <IntroScreen
                {...defaultProps}
                activeSlideAttribute={new EditableValueBuilder<BigJs.Big>().withValue(new Big(1)).build()}
            />
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
