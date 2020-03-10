import { EditableValueBuilder } from "@native-mobile-resources/util-widgets";
import { render } from "react-native-testing-library";
import { createElement } from "react";
import { BottomSheet } from "../BottomSheet";
import { BottomSheetProps } from "../../typings/BottomSheetProps";
import { BottomDrawerStyle } from "../ui/Styles";
import { Text } from "react-native";

jest.mock("Platform", () => ({
    OS: "ios",
    select: jest.fn(dict => dict.ios)
}));

jest.mock("react-native-reanimated", () => jest.requireActual("../../node_modules/react-native-reanimated/mock"));

jest.mock("react-native-gesture-handler", () => {
    jest.requireActual("../../node_modules/react-native-gesture-handler/__mocks__/RNGestureHandlerModule");
});

const defaultProps: BottomSheetProps<BottomDrawerStyle> = {
    name: "bottom-sheet-test",
    style: [],
    nativeImplementation: true,
    type: "modal",
    modalRendering: "basic",
    itemsBasic: [
        {
            caption: "Item 1"
        },
        {
            caption: "Item 2"
        }
    ],
    showFullscreenContent: false,
    triggerAttribute: new EditableValueBuilder<boolean>().withValue(false).build()
};

describe("Bottom sheet", () => {
    it("renders a native bottom action sheet for ios (Basic modal)", () => {
        const component = render(<BottomSheet {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders a custom modal", () => {
        const component = render(<BottomSheet {...defaultProps} modalRendering="custom" largeContent={<Text />} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders a expanding", () => {
        const component = render(
            <BottomSheet
                {...defaultProps}
                type="expanding"
                smallContent={<Text>Header</Text>}
                largeContent={<Text>Content</Text>}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders a expanding fullscreen", () => {
        const component = render(
            <BottomSheet
                {...defaultProps}
                type="expanding"
                smallContent={<Text>Header</Text>}
                largeContent={<Text>Content</Text>}
                showFullscreenContent
                fullscreenContent={<Text>Full screen content</Text>}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
});
