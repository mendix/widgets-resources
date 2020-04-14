import { PopupMenuProps } from "../../typings/PopupMenuProps";
import { PopupMenuStyle } from "../ui/Styles";
import { Text, TouchableHighlight } from "react-native";
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
                { itemType: "item", action: dummyActionValue, caption: "yolo", styleClass: "default" },
                { itemType: "divider", styleClass: "default" }
            ],
            complexItems: [{ content: <Text>Yolo</Text>, action: dummyActionValue }]
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
                    menuItem: {
                        underlayColor: "green",
                        textStyle: {
                            color: "green"
                        }
                    }
                }
            ];
            const component = render(<PopupMenu {...defaultProps} style={customStyle} />);

            expect(component.toJSON()).toMatchSnapshot();
        });
    });

    describe("with complex items", () => {
        beforeEach(() => {
            defaultProps.renderMode = "custom";
        });

        it("renders", () => {
            const component = render(<PopupMenu {...defaultProps} />);

            expect(component.toJSON()).toMatchSnapshot();
        });

        it("triggers action", () => {
            const component = render(<PopupMenu {...defaultProps} />);
            fireEvent.press(component.getAllByType(TouchableHighlight).pop()!);
            expect(dummyActionValue.execute).toHaveBeenCalled();
        });

        it("renders with custom styles", () => {
            const customStyle = [
                {
                    menuItem: {
                        complexItemContainer: {
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
