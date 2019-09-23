import { createElement } from "react";
import { View, Text } from "react-native";
import { render } from "react-native-testing-library";
import { ListViewSwipe } from "../ListViewSwipe";
import { ListViewSwipeProps } from "../../typings/ListViewSwipeProps";
import { ListViewSwipeStyle } from "../ui/styles";
import { actionValue } from "../../../util-widgets/test";

jest.mock("NativeModules", () => ({
    UIManager: {
        RCTView: () => ({
            directEventTypes: {}
        })
    },
    KeyboardObserver: {},
    RNGestureHandlerModule: {
        attachGestureHandler: jest.fn(),
        createGestureHandler: jest.fn(),
        dropGestureHandler: jest.fn(),
        updateGestureHandler: jest.fn(),
        Direction: {
            RIGHT: 1,
            LEFT: 2,
            UP: 4,
            DOWN: 8
        },
        State: { BEGAN: "BEGAN", FAILED: "FAILED", ACTIVE: "ACTIVE", END: "END" }
    },
    PlatformConstants: {
        forceTouchAvailable: false
    }
}));

describe("List View Swipe", () => {
    let defaultProps: ListViewSwipeProps<ListViewSwipeStyle>;

    beforeEach(() => {
        defaultProps = {
            style: [],
            content: null,
            leftRenderMode: "action",
            left: (
                <View>
                    <Text>Test</Text>
                </View>
            ),
            closeOnFinishLeft: false,
            right: null,
            rightRenderMode: "disabled",
            closeOnFinishRight: false
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

    it("render with  left and right with actions", () => {
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
});
