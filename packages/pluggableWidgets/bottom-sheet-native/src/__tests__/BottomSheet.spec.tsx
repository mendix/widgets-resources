import { EditableValueBuilder } from "@widgets-resources/piw-utils";
import { render } from "react-native-testing-library";
import { createElement } from "react";
import { BottomSheet } from "../BottomSheet";
import { BottomSheetProps } from "../../typings/BottomSheetProps";
import { BottomSheetStyle } from "../ui/Styles";
import { Text } from "react-native";

jest.mock("react-native-device-info", () => ({
    getDeviceId: () => "iPhone10,6"
}));

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
    OS: "ios",
    select: jest.fn(dict => dict.ios)
}));

jest.mock("react-native-reanimated", () => jest.requireActual("react-native-reanimated/mock"));

const defaultProps: BottomSheetProps<BottomSheetStyle> = {
    name: "bottom-sheet-test",
    style: [],
    nativeImplementation: true,
    type: "modal",
    modalRendering: "basic",
    itemsBasic: [
        {
            caption: "Item 1",
            styleClass: "defaultStyle"
        },
        {
            caption: "Item 2",
            styleClass: "defaultStyle"
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

    it("renders a custom bottom action sheet for ios (Basic modal) with custom style", () => {
        const style: BottomSheetStyle = {
            container: {},
            containerWhenExpandedFullscreen: {},
            modal: {},
            modalItems: {
                defaultStyle: {
                    color: "red",
                    fontSize: 60
                }
            }
        };
        const component = render(<BottomSheet {...defaultProps} nativeImplementation={false} style={[style]} />);

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

    it("renders a expanding fullscreen with custom styles", () => {
        const style: BottomSheetStyle = {
            container: {
                backgroundColor: "blue"
            },
            containerWhenExpandedFullscreen: {},
            modal: {},
            modalItems: {}
        };
        const component = render(
            <BottomSheet
                {...defaultProps}
                type="expanding"
                smallContent={<Text>Header</Text>}
                largeContent={<Text>Content</Text>}
                showFullscreenContent
                fullscreenContent={<Text>Full screen content</Text>}
                style={[style]}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
});
