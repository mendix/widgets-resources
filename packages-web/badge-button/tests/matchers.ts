/* tslint:disable */
import { ReactChild } from "react";
import { findDifference, toElementStructure } from "./helpers/structureMatcher";

function compareTrees(actual: any, expected: ReactChild, strict: boolean) {
    const actualStruct = toElementStructure(actual);
    const expectedStruct = toElementStructure(expected); // todo: force using of $
    const difference = findDifference(expectedStruct, actualStruct, strict);
    return difference
        ? { pass: false, message: difference }
        : { pass: true, message: "Expected not to match the actual structure" };
}

function toBeElement() {
    return {
        compare: function(actual: ReactChild, expected: ReactChild) {
            return compareTrees(actual, expected, true);
        }
    };
}

function toMatchStructure() {
    return {
        compare: function(actual: HTMLElement, expected: ReactChild) {
            return compareTrees(actual, expected, false);
        }
    };
}

beforeEach(function() {
    jasmine.addMatchers({ toBeElement, toMatchStructure});
});
