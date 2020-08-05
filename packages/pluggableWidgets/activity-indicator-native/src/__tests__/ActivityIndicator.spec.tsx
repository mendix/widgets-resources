import { createElement } from "react";
import { render } from "react-native-testing-library";

import { ActivityIndicator, Props } from "../ActivityIndicator";

const defaultProps: Props = {
    name: "activity-indicator-test",
    style: []
};

describe("ActivityIndicator", () => {
    it("renders with default styles", () => {
        const component = render(<ActivityIndicator {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with custom styles", () => {
        const style = [
            {
                container: { backgroundColor: "red" },
                indicator: { size: "small" as const, color: "red" }
            },
            {
                container: { backgroundColor: "green" },
                indicator: { size: "large" as const, color: "green" }
            }
        ];
        const component = render(<ActivityIndicator {...defaultProps} style={style} />);

        expect(component.toJSON()).toMatchSnapshot();
    });
});
