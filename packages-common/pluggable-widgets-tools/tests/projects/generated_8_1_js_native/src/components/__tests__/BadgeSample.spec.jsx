import { createElement } from "react";
import { shallow } from "enzyme";
import { Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { BadgeSample } from "../BadgeSample";

describe("Badge", () => {
    const createBadge = (props) => shallow(<BadgeSample {...props} />);

    it("it renders the structure correctly", () => {
        const badgeProps = {
            style: [{ container: { display: "flex" }, badge: { borderColor: "white" }, label: { color: "black" } }],
            onClickAction: jasmine.createSpy("onPress"),
            value: "0"
        };
        const badge = createBadge(badgeProps);

        expect(badge).toMatchSnapshot();
    });

    describe("for iOS", () => {
        beforeEach(() => {
            Platform.OS = "ios";
            Platform.select = jest.fn(dict => dict[Platform.OS]);
        });

        it("it renders the structure correctly", () => {
            const badgeProps = {
                style: [],
                onClickAction: jasmine.createSpy("onPress"),
                value: "0"
            };
            const badge = createBadge(badgeProps);

            expect(badge).toMatchSnapshot();
        });
    });

    describe("when pressed", () => {
        it("triggers the onPress event", () => {
            const badgeProps = {
                style: [],
                onClickAction: jasmine.createSpy("onPress"),
                value: "0"
            };
            const badge = createBadge(badgeProps);

            const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

            expect(badge.children()
                .find(Touchable)).not.toBeNull();

            badge.children().simulate("press");

            expect(badgeProps.onClickAction).toHaveBeenCalled();

        });
    });

});
