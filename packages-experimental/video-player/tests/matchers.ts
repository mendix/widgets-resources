/* tslint:disable */
import { ReactChild } from "react";
import { ShallowWrapper } from "enzyme";
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

function toHaveClass() {
    return {
        compare: function(actual: HTMLElement | ShallowWrapper<any, any>, expected: string) {
            const actualClasses = actual instanceof HTMLElement
                ? actual.className
                : actual.prop("className");
            if (actualClasses.trim().split(/\s+/).indexOf(expected) === -1) {
                return {
                    pass: false,
                    message: `Expected element to have class ${expected} but it has ${actualClasses}`
                };
            } else {
                return {
                    pass: true,
                    message: `Expected element not to have class ${expected}`
                };
            }
        }
    };
}

beforeEach(function() {
    jasmine.addMatchers({ toBeElement, toMatchStructure, toHaveClass });
});
