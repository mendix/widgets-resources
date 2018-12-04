/* tslint:disable */
import * as assign from "core-js/fn/object/assign";
import * as keys from "core-js/fn/object/keys";
import * as from from "core-js/fn/array/from";
import * as find from "core-js/fn/array/find";

import { ReactChild, ReactElement, isValidElement } from "react";

export type ElementStructure = string | jasmine.Any | ElementJson;
export type ElementJson = { type: string, props: { [name: string]: any }, children: ElementStructure[] };

export function findDifference(expected: ElementStructure | ElementStructure[], actual: ElementStructure | ElementStructure[], strict: boolean): string {
    if (Array.isArray(expected)) {
        return Array.isArray(actual) && actual.length === expected.length
            ? find(expected.map((e, i) => findDifference(e, actual[i], strict)), diff => diff != null)
            : `Expected ${toString(expected)}, but got ${toString(actual)}`;
    }

    if (isJasmineAny(expected)) {
        return !expected.asymmetricMatch(actual)
            ? `Expected something matching ${toString(expected)}, but got ${toString(actual)}`
            : "";
    }

    if (typeof expected === "string" || typeof actual === "string" || expected == null || actual == null) {
        return actual !== expected
            ? `Expected ${toString(expected)}, but got ${toString(actual)}`
            : "";
    }

    const expectedJson = expected as ElementJson;
    const actualJson = actual as ElementJson;
    const msgPrefix = `Expected ${toString(actualJson)} to have`;

    if (expectedJson.type !== actualJson.type) {
        return `${msgPrefix} type '${expectedJson.type}'`;
    }

    for (let prop in expectedJson.props) {
        const difference = compareProp(prop);
        if (difference) return difference;
    }
    if (strict) {
        const unexpectedProps = keys(actualJson.props).filter(prop => !(prop in expectedJson.props));
        if (unexpectedProps.length > 0) {
            return `${msgPrefix} properties ${keys(expectedJson.props).join(", ")} `
                + `but it also has ${unexpectedProps.join(", ")}`;
        }
    }

    return strict ? strictCompareChildren() : compareChildren();

    function compareProp(prop: string): string {
        const expectedVal = expectedJson.props[prop];
        if (!(prop in actualJson.props)) {
            return `${msgPrefix} property ${prop}`;
        }
        const actualVal = actualJson.props[prop];

        if (isJasmineAny(expectedVal)) {
            if (!expectedVal.asymmetricMatch(actualVal)) {
                return `${msgPrefix} property ${prop} to match ${expectedVal.jasmineToString()} `
                    + `but it was '${jasmine.pp(actualVal)}'`;
            }
        } else if (prop === "className") {
            const difference = compareClasses(expectedVal, actualVal);
            if (difference) return difference;
        } else if (!jasmine.matchersUtil.equals(expectedVal, actualVal)) {
            return `${msgPrefix} property ${prop} to equal '${jasmine.pp(expectedVal)}' `
                + `but it was '${jasmine.pp(actualVal)}'`;
        }
        return "";
    }

    function compareClasses(expectedClassName: string, actualClassName: string): string {
        const expectedClasses = (expectedClassName || "").trim().split(/\s+/);
        const actualClasses = (actualClassName || "").trim().split(/\s+/);

        const missingClasses = expectedClasses.filter(c => actualClasses.indexOf(c) === -1);
        const superfluousClasses = actualClasses.filter(c => expectedClasses.indexOf(c) === -1);

        if (missingClasses.length) {
            return `${msgPrefix} classes ${missingClasses.join(", ")}`;
        }
        if (strict && superfluousClasses.length) {
            return `${msgPrefix} classes ${expectedClassName} but not ${superfluousClasses.join(", ")}`;
        }
        return "";
    }

    function strictCompareChildren(): string {
        for (let i = 0; i < expectedJson.children.length; ++i) {
            const childDiff = findDifference(expectedJson.children[i], actualJson.children[i], true);
            if (childDiff != null) {
                return actualJson.children.length !== expectedJson.children.length
                    ? `${msgPrefix} child ${toString(expectedJson.children[i])}, but it has only ${actualJson.children.map(toString)}`
                    : childDiff;
            }
        }
        if (actualJson.children.length > expectedJson.children.length) {
            return `${msgPrefix} exactly ${expectedJson.children.length} children, `
                + `but it has ${actualJson.children.length}. The first extra child is:\n`
                + toString(actualJson.children[expectedJson.children.length]);
        }
        return "";
    }

    function compareChildren(): string {
        let actualIndex = 0;
        for (let expectedIndex = 0; expectedIndex < expectedJson.children.length; ++expectedIndex) {
            const expectedChild = expectedJson.children[expectedIndex];
            let found = false;
            for (; !found && actualIndex < actualJson.children.length; actualIndex++) {
                if (findDifference(expectedChild, actualJson.children[actualIndex], false) == null) {
                    found = true;
                }
            }
            if (!found && actualIndex === actualJson.children.length) {
                return `${msgPrefix} a child like ${toString(expectedChild)} `
                    + `but it is missing in ${actualJson.children.map(toString).join(", ")}`;
            }
        }
        return "";
    }

    function toString(structure: ElementStructure | ElementStructure[]): string {
        if (isJasmineAny(structure)) return structure.jasmineToString();
        if (typeof structure === "string" || structure == null) return `text '${structure}'`;
        if (Array.isArray(structure)) return "[" + structure.map(toString).join(", ") + "]";
        const json = structure as ElementJson;
        return "element " + json.type + ("className" in json.props ? "." + json.props["className"].trim().replace(/\s+/g, ".") : "");
    }
}

export function toElementStructure(node: any): ElementStructure | ElementStructure[] {
    if (node == null) return "";
    if (typeof node === "object" && "nodes" in node) {
        var elements = node.getElements();
        node = elements.length > 1 ? elements : elements[0];
    }

    if (Array.isArray(node)) return node.map(n => toElementStructure(n) as ElementStructure);
    if (node instanceof HTMLElement) return domToStructure(node);
    return reactToStructure(node as ReactChild | jasmine.Any);

    function domToStructure(domNode: HTMLElement): ElementStructure{
        const type = domNode.nodeName.toLowerCase();
        if (type === "#text") {
            return domNode.nodeValue || "";
        }

        const props: { [name: string]: string } = {};
        from(domNode.attributes || [])
            .filter(attr => attr.nodeName.indexOf("data-react") === -1)
            .forEach(attr => props[attr.nodeName] = attr.nodeValue || "");
        if ("class" in props) {
            props["className"] = props["class"];
            delete props["class"];
        }

        const children = from(domNode.childNodes)
            .filter((child: Node) => child.nodeName !== "#comment")
            .map(domToStructure);

        return { type, props, children };
    }

    function reactToStructure(child: ReactChild | jasmine.Any): ElementStructure {
        if (child == null) return "";
        if (typeof child === "string" || typeof child === "number" || typeof child === "boolean") return child.toString();
        if (isJasmineAny(child)) return child; // todo: disallow Any inside createElement
        if (isValidElement(child)) return elemToStructure(child);
        throw new Error(`Cannot convert ${jasmine.pp(child)} to element structure.\n`
            + `Correct usage is: expect(mount(...)).toBeElement($("div")) or expect(shallow(...)).toBeElement($("div"))`);
    }

    function elemToStructure(reactNode: ReactElement<any>): ElementStructure {
        const type = typeof reactNode.type === "function" ? (reactNode.type as any).name : reactNode.type;

        const props = assign({}, reactNode.props);

        const children: ReactChild[] = Array.isArray(props.children) ? props.children : (props.children ? [ props.children ] : []);
        delete props.children;

        for (let propName in props) {
            const propValue = props[propName];
            if (typeof propValue === "object" && propValue && "_model" in propValue) {
                props[propName] = "Element " + propValue.typeName + " (" + propValue.id + ")";
            }
            if (isValidElement(propValue)) {
                props[propName] = elemToStructure(propValue);
            }
            if (propValue === undefined) {
                delete props[propName];
            }
        }

        return { type, props, children: children.filter(c => c != null).map(reactToStructure) };
    }
}

function isJasmineAny(obj: any): obj is jasmine.Any {
    return obj != null && typeof obj.asymmetricMatch === "function";
}
