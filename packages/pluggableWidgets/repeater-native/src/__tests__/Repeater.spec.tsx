import { fireEvent, render } from "react-native-testing-library";
import { Repeater } from "../Repeater";
import { ListValueBuilder } from "@widgets-resources/piw-utils";
import { createElement } from "react";
import { Text } from "react-native";
import { Touchable } from "../Touchable";

describe("Repeater", () => {
    it("renders correctly", () => {
        const component = render(
            <Repeater
                name="test-repeater"
                style={[{ container: {} }]}
                datasource={ListValueBuilder().withAmountOfItems(5)}
                content={() => <Text>Item</Text>}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders correctly with custom styles", () => {
        const component = render(
            <Repeater
                name="test-repeater"
                style={[{ container: { backgroundColor: "red" } }]}
                datasource={ListValueBuilder().withAmountOfItems(5)}
                content={() => <Text>Item</Text>}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders correctly containing action", () => {
        const onClick = jest.fn();
        const component = render(
            <Repeater
                name="test-repeater"
                style={[{ container: {} }]}
                datasource={ListValueBuilder().withAmountOfItems(5)}
                content={() => <Text>Item</Text>}
                onClick={() => ({
                    canExecute: true,
                    isExecuting: false,
                    execute: onClick
                })}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
        fireEvent.press(component.getAllByType(Touchable).pop()!);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("renders correctly containing action and custom styles", () => {
        const component = render(
            <Repeater
                name="test-repeater"
                style={[{ container: { backgroundColor: "green" } }]}
                datasource={ListValueBuilder().withAmountOfItems(5)}
                content={() => <Text>Item</Text>}
                onClick={() => ({
                    canExecute: true,
                    isExecuting: false,
                    execute: jest.fn()
                })}
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
});
