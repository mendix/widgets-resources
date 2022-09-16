import { ObjectItem, ListActionValue, ActionValue, DynamicValue, ListExpressionValue, ListWidgetValue } from "mendix";
import {
    createAttributeResolver,
    createEventResolver,
    prepareAttributes,
    prepareChildren,
    prepareEvents,
    prepareHtml,
    prepareTag
} from "../props-utils";
import { ReactNode } from "react";

describe("props-utils", () => {
    describe("prepareTag", () => {
        it("returns predefined tag", () => {
            expect(prepareTag("p", "div")).toEqual("p");
        });

        it("returns custom tag", () => {
            expect(prepareTag("__customTag__", "div")).toEqual("div");
        });
    });

    describe("prepareChildren", () => {
        it("return undefined if not set to container", () => {
            expect(
                prepareChildren({
                    tagContentMode: "innerHTML",
                    tagContentContainer: "Look ma, I am a react node" as ReactNode,
                    tagContentRepeatContainer: undefined
                })
            ).toEqual(undefined);
        });

        it("works without item", () => {
            expect(
                prepareChildren({
                    tagContentMode: "container",
                    tagContentContainer: "Look ma, I am a react node" as ReactNode,
                    tagContentRepeatContainer: undefined
                })
            ).toEqual("Look ma, I am a react node");
        });

        it("works with item", () => {
            expect(
                prepareChildren(
                    {
                        tagContentMode: "container",
                        tagContentContainer: undefined,
                        tagContentRepeatContainer: {
                            get: i => {
                                return `Look ma, I am a ${i.id}` as ReactNode;
                            }
                        } as ListWidgetValue
                    },
                    { id: "repeated react node" } as ObjectItem
                )
            ).toEqual("Look ma, I am a repeated react node");
        });
    });

    describe("prepareHtml", () => {
        it("return undefined if not set to innerHTML", () => {
            expect(
                prepareHtml({
                    tagContentMode: "container",
                    tagContentHTML: {
                        value: "<div>html text</div>",
                        status: "available"
                    } as DynamicValue<string>,
                    tagContentRepeatHTML: undefined
                })
            ).toEqual(undefined);
        });

        it("works without item", () => {
            expect(
                prepareHtml({
                    tagContentMode: "innerHTML",
                    tagContentHTML: {
                        value: "<div>html text</div>",
                        status: "available"
                    } as DynamicValue<string>,
                    tagContentRepeatHTML: undefined
                })
            ).toEqual("<div>html text</div>");
        });

        it("works with item", () => {
            expect(
                prepareHtml(
                    {
                        tagContentMode: "innerHTML",
                        tagContentHTML: undefined,
                        tagContentRepeatHTML: {
                            get: i => {
                                return {
                                    value: `<div>html ${i.id}</div>`,
                                    status: "available"
                                } as DynamicValue<string>;
                            }
                        } as ListExpressionValue<string>
                    },
                    { id: "repeat text" } as ObjectItem
                )
            ).toEqual("<div>html repeat text</div>");
        });
    });

    describe("event preparation", () => {
        describe("prepareEvents", () => {
            it("works", () => {
                const eventCb = jest.fn();

                const result = prepareEvents(
                    e => [e.myEventName, e.myEventCb],
                    [
                        {
                            myEventName: "onClick",
                            myEventCb: eventCb
                        }
                    ]
                );

                expect(result).toEqual({ onClick: eventCb });
            });
        });

        describe("createEventResolver", () => {
            it("works without item", () => {
                const [av, actionMock] = createActionValue();
                const resolver = createEventResolver();

                const [name, cb] = resolver({
                    eventName: "onClick",
                    eventAction: av,
                    eventActionRepeat: undefined,
                    eventStopPropagation: true,
                    eventPreventDefault: true
                });

                expect(name).toEqual("onClick");
                expect(cb).toEqual(expect.any(Function));

                const event = {
                    stopPropagation: jest.fn(),
                    preventDefault: jest.fn()
                };
                cb(event as any); // dirty hack here

                expect(actionMock).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });

            it("works with item", () => {
                const [lav, getMock, actionMock] = createListActionValue();
                const item = { id: "test" } as ObjectItem;
                const resolver = createEventResolver(item);

                const [name, cb] = resolver({
                    eventName: "onClick",
                    eventAction: undefined,
                    eventActionRepeat: lav,
                    eventStopPropagation: true,
                    eventPreventDefault: true
                });

                expect(name).toEqual("onClick");
                expect(cb).toEqual(expect.any(Function));

                const event = {
                    stopPropagation: jest.fn(),
                    preventDefault: jest.fn()
                };
                cb(event as any); // dirty hack here

                expect(getMock).toHaveBeenCalledWith(item);
                expect(actionMock).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });

            it("respects flags", () => {
                const [av, actionMock] = createActionValue();
                const resolver = createEventResolver();

                const [, cb] = resolver({
                    eventName: "onClick",
                    eventAction: av,
                    eventActionRepeat: undefined,
                    eventStopPropagation: false,
                    eventPreventDefault: false
                });

                const event = {
                    stopPropagation: jest.fn(),
                    preventDefault: jest.fn()
                };
                cb(event as any); // dirty hack here

                expect(actionMock).toHaveBeenCalled();
                expect(event.stopPropagation).not.toHaveBeenCalled();
                expect(event.preventDefault).not.toHaveBeenCalled();
            });
        });
    });

    describe("attributes preparation", () => {
        describe("createAttributeResolver", () => {
            describe("works correctly without item", () => {
                let resolver: ReturnType<typeof createAttributeResolver>;

                beforeEach(() => {
                    resolver = createAttributeResolver();
                });

                it("on templates", () => {
                    expect(
                        resolver({
                            attributeName: "class",
                            attributeValueType: "template",
                            attributeValueTemplate: {
                                value: "value text",
                                status: "available"
                            } as DynamicValue<string>
                        })
                    ).toEqual(["class", "value text"]);
                });

                it("on expressions", () => {
                    expect(
                        resolver({
                            attributeName: "class",
                            attributeValueType: "expression",
                            attributeValueExpression: {
                                value: "value expr",
                                status: "available"
                            } as DynamicValue<string>
                        })
                    ).toEqual(["class", "value expr"]);
                });
            });

            describe("works correctly with item", () => {
                let resolver: ReturnType<typeof createAttributeResolver>;

                beforeEach(() => {
                    resolver = createAttributeResolver({ id: "repeated" } as ObjectItem);
                });

                it("on templates", () => {
                    expect(
                        resolver({
                            attributeName: "class",
                            attributeValueType: "template",
                            attributeValueTemplateRepeat: {
                                get: i => {
                                    return {
                                        value: `value text ${i.id}`,
                                        status: "available"
                                    } as DynamicValue<string>;
                                }
                            } as ListExpressionValue<string>
                        })
                    ).toEqual(["class", "value text repeated"]);
                });

                it("on expressions", () => {
                    expect(
                        resolver({
                            attributeName: "class",
                            attributeValueType: "expression",
                            attributeValueExpressionRepeat: {
                                get: i => {
                                    return {
                                        value: `value expr ${i.id}`,
                                        status: "available"
                                    } as DynamicValue<string>;
                                }
                            } as ListExpressionValue<string>
                        })
                    ).toEqual(["class", "value expr repeated"]);
                });
            });
        });

        describe("prepareAttributes", () => {
            it("works correctly", () => {
                const result = prepareAttributes(
                    a => {
                        return [a.myName, a.myValue];
                    },
                    [
                        {
                            myName: "class",
                            myValue: "dynamic-class"
                        },
                        {
                            myName: "style",
                            myValue: "border: 1px solid green; font-size: 25px;"
                        },
                        {
                            myName: "data-test",
                            myValue: "test-data-attr-value"
                        }
                    ],
                    "mx-name-hello",
                    {
                        borderRadius: "2px"
                    }
                );

                expect(result).toEqual({
                    className: "html-node-widget mx-name-hello dynamic-class",
                    style: { border: "1px solid green", fontSize: "25px", borderRadius: "2px" },
                    "data-test": "test-data-attr-value"
                });
            });
        });
    });
});

function createActionValue(): [ActionValue, jest.Mock] {
    const actionFn = jest.fn();

    return [
        {
            canExecute: true,
            isExecuting: false,
            execute: actionFn
        },
        actionFn
    ];
}

function createListActionValue(): [ListActionValue, jest.Mock, jest.Mock] {
    const getFn = jest.fn<ActionValue, [ObjectItem]>();
    const [actionValue, actionFn] = createActionValue();
    getFn.mockReturnValue(actionValue);

    return [
        {
            get: getFn as (item: ObjectItem) => ActionValue
        } as ListActionValue,
        getFn,
        actionFn
    ];
}
