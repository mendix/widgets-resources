import { createElement } from "react";
import { render } from "react-native-testing-library";
import { SafeAreaView } from "../SafeAreaView";
import { SafeAreaViewProps } from "../../typings/SafeAreaViewProps";
import { SafeAreaViewStyle } from "../ui/Styles";
import { Text } from "react-native";

describe("Safe area view", () => {
    let defaultProps: SafeAreaViewProps<SafeAreaViewStyle>;

    beforeEach(() => {
        defaultProps = {
            name: "safe-area-view-test",
            style: [],
            content: <Text>Content</Text>
        };
    });

    it("renders with content", () => {
        const component = render(
            <SafeAreaView name={defaultProps.name} style={defaultProps.style} content={defaultProps.content} />
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders without content", () => {
        delete defaultProps.content;
        const component = render(<SafeAreaView {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with custom styling", () => {
        defaultProps.style = [
            {
                container: { backgroundColor: "blue" }
            },
            { container: { backgroundColor: "green" } }
        ];
        const component = render(<SafeAreaView {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
