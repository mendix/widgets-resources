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
        compare: (actual: ReactChild, expected: ReactChild) =>
            compareTrees(actual, expected, true)
    };
}

function toMatchStructure() {
    return {
        compare: (actual: HTMLElement, expected: ReactChild) =>
            compareTrees(actual, expected, false)
    };
}

function toHaveClass() {
    return {
        compare: (actual: HTMLElement | ShallowWrapper<any, any>, expected: string) => {
            const actualClasses = actual instanceof HTMLElement
                ? actual.className
                : actual.prop("className");
            if (actualClasses.trim().split(/\s+/).indexOf(expected) === -1) {
                return {
                    message: `Expected element to have class ${expected} but it has ${actualClasses}`,
                    pass: false
                };
            } else {
                return {
                    message: `Expected element not to have class ${expected}`,
                    pass: true
                };
            }
        }
    };
}

beforeEach(() =>
    jasmine.addMatchers({ toBeElement, toMatchStructure, toHaveClass })
);
