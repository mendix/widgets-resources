import { FloatingActionButtonProps } from "../../typings/FloatingActionButtonProps";
import { FloatingActionButtonStyle } from "../ui/styles";
import { render } from "react-native-testing-library";
import { createElement } from "react";
import { FloatingActionButton } from "../FloatingActionButton";
import { actionValue, dynamicValue } from "@mendix/piw-utils-internal";

describe("FloatingActionButton", () => {
    let defaultProps: FloatingActionButtonProps<FloatingActionButtonStyle>;
    beforeEach(() => {
        defaultProps = {
            name: "FloatingAction",
            style: [],
            horizontalPosition: "right",
            verticalPosition: "bottom",
            secondaryButtons: []
        };
    });

    it("renders floating action button", () => {
        const component = render(<FloatingActionButton {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with secondary buttons", () => {
        const secondarybuttons = [
            {
                icon: dynamicValue(undefined),
                caption: dynamicValue("caption1"),
                onClick: actionValue(true, false)
            },
            {
                icon: dynamicValue(undefined),
                caption: dynamicValue("caption2"),
                onClick: actionValue(true, false)
            },
            {
                icon: dynamicValue(undefined),
                caption: dynamicValue("caption3"),
                onClick: actionValue(true, false)
            }
        ];
        const component = render(<FloatingActionButton {...defaultProps} secondaryButtons={secondarybuttons} />);

        expect(component.toJSON()).toMatchSnapshot();
    });
});
