import { createElement, Fragment } from "react";
import { View, Text, ScrollView } from "react-native";
import { render } from "react-native-testing-library";
import { ListViewSwipe } from "../ListViewSwipe";
import { ListViewSwipeProps } from "../../typings/ListViewSwipeProps";
import { ListViewSwipeStyle } from "../ui/styles";
import { actionValue } from "@mendix/piw-utils-internal";
import { RectButton } from "react-native-gesture-handler";

jest.mock("react-native-gesture-handler", () => ({
    ScrollView,
    PanGestureHandler: View,
    TapGestureHandler: View,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    attachGestureHandler: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    createGestureHandler: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dropGestureHandler: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateGestureHandler: () => {},
    Direction: {
        RIGHT: 1,
        LEFT: 2,
        UP: 4,
        DOWN: 8
    },
    RectButton: View,
    State: { BEGAN: "BEGAN", FAILED: "FAILED", ACTIVE: "ACTIVE", END: "END", UNDETERMINED: "UNDETERMINED" }
}));

jest.mock("react-native-gesture-handler/Swipeable", () => View);

describe("List View Swipe", () => {
    let defaultProps: ListViewSwipeProps<ListViewSwipeStyle>;

    beforeEach(() => {
        defaultProps = {
            name: "list-view-swipe-test",
            style: [],
            content: null,
            leftRenderMode: "swipeOutReset",
            left: (
                <View>
                    <Text>Test</Text>
                </View>
            ),
            right: null,
            rightRenderMode: "disabled"
        };
    });

    it("renders", () => {
        const component = render(<ListViewSwipe {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("render with left and action", () => {
        const onChangeAction = actionValue();
        const left = (
            <View>
                <Text>Test</Text>
            </View>
        );
        const component = render(<ListViewSwipe {...defaultProps} left={left} onSwipeLeft={onChangeAction} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("render with right and action", () => {
        const onChangeAction = actionValue();
        const right = (
            <View>
                <Text>Test</Text>
            </View>
        );
        const component = render(<ListViewSwipe {...defaultProps} right={right} onSwipeRight={onChangeAction} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("render with left and right with actions", () => {
        const onChangeAction = actionValue();
        const left = (
            <View>
                <Text>Left Side</Text>
            </View>
        );
        const right = (
            <View>
                <Text>Right Side</Text>
            </View>
        );
        const component = render(
            <ListViewSwipe
                {...defaultProps}
                left={left}
                right={right}
                onSwipeLeft={onChangeAction}
                onSwipeRight={onChangeAction}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("render with archive animation", () => {
        const component = render(<ListViewSwipe {...defaultProps} leftRenderMode={"archive"} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("render with buttons option", () => {
        const left = (
            <Fragment>
                <RectButton>Button 1</RectButton>
                <RectButton>Button 2</RectButton>
            </Fragment>
        );
        const component = render(<ListViewSwipe {...defaultProps} left={left} leftRenderMode={"buttons"} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("render with toggle animation", () => {
        const component = render(<ListViewSwipe {...defaultProps} leftRenderMode={"toggle"} />);

        expect(component.toJSON()).toMatchSnapshot();
    });
});
