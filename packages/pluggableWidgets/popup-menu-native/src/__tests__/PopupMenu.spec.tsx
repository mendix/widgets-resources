import { PopupMenuProps } from "../../typings/PopupMenuProps";
import { PopupMenuStyle } from "../ui/Styles";
import { Modal, Text, View } from "react-native";
import { createElement } from "react";
import { actionValue } from "@mendix/piw-utils-internal";
import { fireEvent, render, within } from "@testing-library/react-native";
import { PopupMenu } from "../PopupMenu";
import { MenuDivider } from "react-native-material-menu";
import { ReactTestInstance } from "react-test-renderer";

let dummyActionValue: any;
let defaultProps: PopupMenuProps<PopupMenuStyle>;
jest.useFakeTimers();

let basicItemTestId: string;
let customItemTestId: string;

describe("Popup menu", () => {
    beforeEach(() => {
        dummyActionValue = actionValue();
        defaultProps = {
            renderMode: "basic",
            name: "popup-menu",
            style: [],
            menuTriggerer: <Text>Menu Triggerer</Text>,
            basicItems: [
                { itemType: "item", action: dummyActionValue, caption: "yolo", styleClass: "defaultStyle" },
                { itemType: "divider", styleClass: "defaultStyle", caption: "" }
            ],
            customItems: [{ content: <Text>Yolo</Text>, action: dummyActionValue }]
        };

        basicItemTestId = `${defaultProps.name}_basic-item`;
        customItemTestId = `${defaultProps.name}_custom-item`;
    });

    it("renders", () => {
        const component = render(<PopupMenu {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    describe("in basic mode", () => {
        it("renders only basic items", async () => {
            const component = render(<PopupMenu {...defaultProps} />);

            const basicItems = component.queryAllByTestId(basicItemTestId);
            const dividers = component.UNSAFE_queryAllByType(MenuDivider);
            const customItems = component.queryAllByTestId(customItemTestId);
            expect(basicItems).toHaveLength(1);
            expect(within(basicItems[0]).getByText("yolo")).not.toBeNull();
            expect(dividers).toHaveLength(1);
            expect(customItems).toHaveLength(0);
        });

        it("triggers action", () => {
            const component = render(<PopupMenu {...defaultProps} />);
            fireEvent.press(component.getByTestId(basicItemTestId));

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
            expect(component.getByTestId(basicItemTestId).findByProps({ color: "green" })).not.toBeNull();
        });
    });

    describe("in custom mode", () => {
        beforeEach(() => {
            defaultProps.renderMode = "custom";
        });

        it("renders only custom items", () => {
            const component = render(<PopupMenu {...defaultProps} />);

            const basicItems = component.queryAllByTestId(basicItemTestId);
            const dividers = component.UNSAFE_queryAllByType(MenuDivider);
            const customItems = component.queryAllByTestId(customItemTestId);
            expect(basicItems).toHaveLength(0);
            expect(dividers).toHaveLength(0);
            expect(customItems).toHaveLength(1);
            expect(within(customItems[0]).getByText("Yolo")).not.toBeNull();
        });

        it("triggers action", () => {
            const component = render(<PopupMenu {...defaultProps} />);
            fireEvent.press(component.getByTestId(customItemTestId));

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
            const modal = component.UNSAFE_getByType(Modal);
            const firstView = within(modal).UNSAFE_getByType(View);
            const secondView = within(firstView.children[0] as ReactTestInstance).UNSAFE_getByType(View);
            expect(secondView.props.style.backgroundColor).toEqual("yellow");
            expect(within(secondView).getByText("Yolo")).not.toBeNull();
        });
    });
});
