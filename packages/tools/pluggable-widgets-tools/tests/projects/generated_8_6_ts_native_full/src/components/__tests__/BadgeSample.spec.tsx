import { createElement } from "react";
import { shallow } from "enzyme";
import { Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { BadgeSample, BadgeSampleProps } from "../BadgeSample";

describe("Badge", () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const createBadge = (props: BadgeSampleProps): any => shallow(<BadgeSample {...props} />);

    it("it renders the structure correctly", () => {
        const badgeProps: BadgeSampleProps = {
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
            Platform.select = jest.fn((dict: any) => dict[Platform.OS]);
        });

        it("it renders the structure correctly", () => {
            const badgeProps: BadgeSampleProps = {
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
            const badgeProps: BadgeSampleProps = {
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
