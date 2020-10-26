import { render } from "react-native-testing-library";
import { Repeater } from "../Repeater";
import { ListValueBuilder } from "@widgets-resources/piw-utils";
import { createElement } from "react";
import { Text } from "react-native";

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
});
