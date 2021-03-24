import { actionValue, dynamicValue } from "@mendix/piw-utils-internal";
import { createElement } from "react";
import { Platform, Text } from "react-native";
import { fireEvent, render } from "react-native-testing-library";

import { Badge, Props } from "../Badge";

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
    OS: "ios",
    select: jest.fn(dict => dict.ios)
}));

const defaultProps: Props = {
    name: "badge-test",
    style: [],
    caption: dynamicValue<string>()
};

describe("Badge", () => {
    it("renders with default styles", () => {
        const component = render(<Badge {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with custom styles", () => {
        const style = [
            {
                container: { backgroundColor: "red", borderColor: "green" },
                badge: { backgroundColor: "red" },
                caption: { color: "red" }
            },
            {
                container: { backgroundColor: "green" },
                badge: { backgroundColor: "green" },
                caption: { color: "green" }
            }
        ];
        const component = render(<Badge {...defaultProps} style={style} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    describe("renders a caption", () => {
        const component = render(<Badge {...defaultProps} caption={dynamicValue("Caption")} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    describe("with on click action", () => {
        describe("iOS", () => {
            it("renders touchables", () => {
                const onClickAction = actionValue();
                const component = render(<Badge {...defaultProps} onClick={onClickAction} />);
                expect(component.toJSON()).toMatchSnapshot();
            });

            it("executes the action when pressed", () => {
                const onClickAction = actionValue();
                const component = render(<Badge {...defaultProps} onClick={onClickAction} />);
                fireEvent.press(component.UNSAFE_getByType(Text));
                expect(onClickAction.execute).toHaveBeenCalledTimes(1);
            });
        });

        describe("Android", () => {
            beforeEach(() => {
                Platform.OS = "android";
                Platform.select = jest.fn(dict => dict.android!);
            });

            it("renders touchables", () => {
                const onClickAction = actionValue();
                const component = render(<Badge {...defaultProps} onClick={onClickAction} />);
                expect(component.toJSON()).toMatchSnapshot();
            });

            it("executes the action when pressed", () => {
                const onClickAction = actionValue();
                const component = render(<Badge {...defaultProps} onClick={onClickAction} />);
                fireEvent.press(component.UNSAFE_getByType(Text));
                expect(onClickAction.execute).toHaveBeenCalledTimes(1);
            });
        });
    });
});
