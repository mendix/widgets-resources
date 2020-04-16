import { PopupMenuProps } from "../../typings/PopupMenuProps";
import { PopupMenuStyle } from "../ui/Styles";
import { Text, TouchableOpacity } from "react-native";
import { createElement } from "react";
import { actionValue } from "@native-mobile-resources/util-widgets";
import { fireEvent, render } from "react-native-testing-library";
import { PopupMenu } from "../PopupMenu";
import { MenuItem } from "react-native-material-menu";

let dummyActionValue: any;
let defaultProps: PopupMenuProps<PopupMenuStyle>;

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
                { itemType: "divider", styleClass: "defaultStyle" }
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
            fireEvent.press(component.getByType(MenuItem));
            expect(dummyActionValue.execute).toHaveBeenCalled();
        });

        it("renders with custom styles", () => {
            const customStyle = [
                {
                    basicItem: {
                        defaultStyle: {
                            textStyle: {
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
            fireEvent.press(component.getAllByType(TouchableOpacity).pop()!);
            expect(dummyActionValue.execute).toHaveBeenCalled();
        });

        it("renders with custom styles", () => {
            const customStyle = [
                {
                    customItem: {
                        container: {
                            backgroundColor: "yellow"
                        }
                    }
                }
            ];
            const component = render(<PopupMenu {...defaultProps} style={customStyle} />);

            expect(component.toJSON()).toMatchSnapshot();
        });
    });
});
