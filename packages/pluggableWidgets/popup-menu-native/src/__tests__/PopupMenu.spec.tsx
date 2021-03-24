import { PopupMenuProps } from "../../typings/PopupMenuProps";
import { PopupMenuStyle } from "../ui/Styles";
import { Text, TouchableHighlight } from "react-native";
import { createElement } from "react";
import { actionValue } from "@mendix/piw-utils-internal";
import { fireEvent, render } from "react-native-testing-library";
import { PopupMenu } from "../PopupMenu";
import { MenuItem } from "react-native-material-menu";

let dummyActionValue: any;
let defaultProps: PopupMenuProps<PopupMenuStyle>;
jest.useFakeTimers();

describe("Popup menu", () => {
    beforeEach(() => {
        dummyActionValue = actionValue();
        defaultProps = {
            renderMode: "basic",
            name: "popup-menu",
            style: [],
            menuTriggerer: undefined,
            basicItems: [
                { itemType: "item", action: dummyActionValue, caption: "yolo", styleClass: "defaultStyle" },
                { itemType: "divider", styleClass: "defaultStyle", caption: "" }
            ],
            customItems: [{ content: <Text>Yolo</Text>, action: dummyActionValue }]
        };
    });
    it("renders menu triggerer", () => {
        const menuTriggerer = <Text>Menu Triggerer</Text>;
        const component = render(<PopupMenu {...defaultProps} menuTriggerer={menuTriggerer} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    describe("with basic items", () => {
        it("renders", () => {
            const component = render(<PopupMenu {...defaultProps} />);

            expect(component.toJSON()).toMatchSnapshot();
        });

        it("triggers action", () => {
            const component = render(<PopupMenu {...defaultProps} />);
            fireEvent.press(component.UNSAFE_getByType(MenuItem));

            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
        });

        it("renders with custom styles", () => {
            const customStyle = [
                {
                    basic: {
                        itemStyle: {
                            defaultStyle: {
                                color: "green"
                            }
                        }
                    }
                }
            ];
            const component = render(<PopupMenu {...defaultProps} style={customStyle} />);

            expect(component.toJSON()).toMatchSnapshot();
        });
    });

    describe("with custom items", () => {
        beforeEach(() => {
            defaultProps.renderMode = "custom";
        });

        it("renders", () => {
            const component = render(<PopupMenu {...defaultProps} />);

            expect(component.toJSON()).toMatchSnapshot();
        });

        it("triggers action", () => {
            const component = render(<PopupMenu {...defaultProps} />);
            fireEvent.press(component.UNSAFE_getAllByType(TouchableHighlight).pop()!);

            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
        });

        it("renders with custom styles", () => {
            const customStyle = [
                {
                    container: {
                        backgroundColor: "yellow"
                    }
                }
            ];
            const component = render(<PopupMenu {...defaultProps} style={customStyle} />);

            expect(component.toJSON()).toMatchSnapshot();
        });
    });
});
