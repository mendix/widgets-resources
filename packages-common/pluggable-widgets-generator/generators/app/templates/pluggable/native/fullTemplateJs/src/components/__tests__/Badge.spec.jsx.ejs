import { createElement } from "react";
import { shallow } from "enzyme";
import { Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native";

import { Badge } from "../Badge";

describe.each(["ios", "android"])("Badge for %s", os => {
    beforeEach(() => {
        Platform.OS = os;
        Platform.select = jest.fn(dict => dict[Platform.OS]);
    });

    it("renders the structure correctly", () => {
        const badgeProps = {
            style: [],
            onClick: jest.fn(),
            value: "0"
        };
        const badge = shallow(<Badge {...badgeProps} />);

        expect(badge).toMatchSnapshot();
    });

    it("renders the structure correctly with custom style", () => {
        const badgeProps = {
            style: [{ container: { display: "flex" }, badge: { borderColor: "white" }, label: { color: "black" } }],
            onClick: jest.fn(),
            value: "0"
        };
        const badge = shallow(<Badge {...badgeProps} />);

        expect(badge).toMatchSnapshot();
    });

    it("triggers the onClick action when pressed", () => {
        const badgeProps = {
            style: [],
            onClick: jest.fn(),
            value: "0"
        };
        const badge = shallow(<Badge {...badgeProps} />);

        const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

        expect(badge.children().find(Touchable)).not.toBeNull();

        badge.children().simulate("press");

        expect(badgeProps.onClick).toHaveBeenCalled();
    });
});
