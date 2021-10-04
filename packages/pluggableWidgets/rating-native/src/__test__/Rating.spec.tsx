/**
 * @jest-environment jsdom
 */
import { Big } from "big.js";
import { dynamicValue, EditableValueBuilder } from "@mendix/piw-utils-internal";
import { Rating, Props } from "../Rating";
import { mount } from "enzyme";
import { defaultRatingStyle } from "../ui/Styles";
import { createElement } from "react";
import { ActionValue, EditableValue } from "mendix";

const ratingProps: Props = {
    animation: "bounce",
    editable: "default",
    maximumValue: 5,
    name: "Test",
    ratingAttribute: new EditableValueBuilder<Big>().withValue(new Big(0)).build(),
    style: [defaultRatingStyle],
    icon: dynamicValue({ uri: "" }),
    emptyIcon: dynamicValue({ uri: "" })
};

describe("Rating", () => {
    it("should select the right amount of stars", async () => {
        const actionValue = { canExecute: true, isExecuting: false, execute: jest.fn() } as ActionValue;
        const rating = mount(<Rating {...ratingProps} onChange={actionValue} />);

        const starButton = rating.find("StarButton").at(2);
        starButton.simulate("click");

        expect(actionValue.execute).toHaveBeenCalledTimes(1);
        const actual = (rating.prop("ratingAttribute") as EditableValue<Big>).value;
        const expected = new Big(3);
        expect(actual).toStrictEqual(expected);
    });
});
