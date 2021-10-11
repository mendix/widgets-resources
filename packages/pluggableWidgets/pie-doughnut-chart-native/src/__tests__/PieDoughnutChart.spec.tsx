import { EditableValueBuilder, ListAttributeValueBuilder, ListValueBuilder } from "@mendix/piw-utils-internal";
import { act, fireEvent, render, Thenable } from "@testing-library/react-native";
import { ReactTestInstance } from "react-test-renderer";
import { ObjectItem } from "mendix";
import { View } from "react-native";
import { createElement } from "react";
import { Big } from "big.js";

import { PieDoughnutChartProps, SeriesType } from "../../typings/PieDoughnutChartProps";
import { ChartStyle, defaultStyle } from "../ui/Styles";
import { PieDoughnutChart } from "../PieDoughnutChart";

jest.mock("victory-native", () => ({
    VictoryPie: jest.fn(({ children, ...rest }) => (
        <View testID="mock" {...rest}>
            {children}
        </View>
    ))
}));

describe("PieDoughnutChart", () => {
    describe("configuration", () => {
        it("basic static props", () => {
            const { getByTestId, toJSON } = render(<PieDoughnutChart {...createProps()} />);
            fireLayoutEvent(getByTestId("innerView"));

            expect(toJSON()).toMatchSnapshot();
        });

        it("renders doughnut correctly with default inner radius", () => {
            const { getByTestId } = render(<PieDoughnutChart {...createProps({ presentation: "doughnut" })} />);
            fireLayoutEvent(getByTestId("innerView"));

            expect(getByTestId("mock").props.innerRadius).toEqual(25);
        });

        it("renders doughnut correctly with custom inner radius", () => {
            const { getByTestId } = render(
                <PieDoughnutChart
                    {...createProps({
                        presentation: "doughnut",
                        style: [
                            {
                                slices: {
                                    innerRadius: 111
                                }
                            }
                        ]
                    })}
                />
            );
            fireLayoutEvent(getByTestId("innerView"));

            expect(getByTestId("mock").props.innerRadius).toEqual(111);
        });

        it("handles labels", () => {
            const { getByTestId } = render(<PieDoughnutChart {...createProps({ showLabels: true })} />);
            fireLayoutEvent(getByTestId("innerView"));

            expect(getByTestId("mock").props.labels({ datum: { x: "label1" } })).toEqual("label1");
        });
    });

    describe("data", () => {
        const style = [
            {
                slices: {
                    colorPalette: "red;green",
                    customStyles: {
                        key1: {
                            slice: {
                                color: "watermelon"
                            },
                            label: {
                                fontSize: 11
                            }
                        }
                    }
                }
            }
        ] as ChartStyle[];

        it("should create correct series data", () => {
            const { getByTestId } = render(
                <PieDoughnutChart {...createProps({ style, series: setupBasicSeries() })} />
            );
            fireLayoutEvent(getByTestId("innerView"));
            const mock = getByTestId("mock");

            expect(mock.props.data).toEqual([
                { labelStyle: { fill: "watermelon", fontSize: 11 }, stylingKey: "key1", x: "Formatted one", y: 3 },
                { labelStyle: { fill: "red" }, stylingKey: undefined, x: "Formatted two", y: 6 }
            ]);
        });

        it("should create correct label style getters", () => {
            const { getByTestId } = render(
                <PieDoughnutChart {...createProps({ style, series: setupBasicSeries() })} />
            );
            fireLayoutEvent(getByTestId("innerView"));
            const mock = getByTestId("mock");

            expect(mock.props.style.labels.fill({ datum: { labelStyle: { fill: "red" } } })).toEqual("red");
            expect(mock.props.style.labels.fontFamily({ datum: { labelStyle: { fontFamily: "Helvetica" } } })).toEqual(
                "Helvetica"
            );
            expect(mock.props.style.labels.fontSize({ datum: { labelStyle: { fontSize: 123 } } })).toEqual(123);
            expect(mock.props.style.labels.fontStyle({ datum: { labelStyle: { fontStyle: "italic" } } })).toEqual(
                "italic"
            );
            expect(mock.props.style.labels.fontWeight({ datum: { labelStyle: { fontWeight: "200" } } })).toEqual("200");
        });

        it("should create correct colorScale", () => {
            const style = [
                {
                    slices: {
                        colorPalette: "red;green;purple;yellow;pink;blue",
                        customStyles: {
                            key1: {
                                slice: {
                                    color: "watermelon"
                                }
                            },
                            key2: {
                                slice: {
                                    color: "dullgrey"
                                }
                            },
                            key4: {
                                slice: {
                                    color: "brightred"
                                }
                            }
                        }
                    }
                }
            ] as ChartStyle[];

            const { getByTestId } = render(
                <PieDoughnutChart {...createProps({ style, series: setupComplexSeries() })} />
            );
            fireLayoutEvent(getByTestId("innerView"));
            const mock = getByTestId("mock");

            expect(mock.props.colorScale).toEqual(["watermelon", "dullgrey", "red", "brightred", "green"]);
        });

        it("should sort data correctly in ascending order", () => {
            const { getByTestId } = render(
                <PieDoughnutChart {...createProps({ style, series: setupComplexSeries("ascending") })} />
            );
            fireLayoutEvent(getByTestId("innerView"));
            const mock = getByTestId("mock");

            expect(mock.props.data).toEqual([
                {
                    labelStyle: {
                        fill: "red"
                    },
                    x: "Formatted five",
                    y: 3
                },
                {
                    labelStyle: {
                        fill: "watermelon",
                        fontSize: 11
                    },
                    stylingKey: "key1",
                    x: "Formatted one",
                    y: 8
                },
                {
                    labelStyle: {
                        fill: "green"
                    },
                    stylingKey: "key4",
                    x: "Formatted four",
                    y: 11
                },
                {
                    labelStyle: {
                        fill: "red"
                    },
                    x: "Formatted three",
                    y: 12
                },
                {
                    labelStyle: {
                        fill: "green"
                    },
                    stylingKey: "key2",
                    x: "Formatted two",
                    y: 36
                }
            ]);
        });

        it("should sort data correctly in descending order", () => {
            const { getByTestId } = render(
                <PieDoughnutChart
                    {...createProps({ style, sortOrder: "descending", series: setupComplexSeries("descending") })}
                />
            );
            fireLayoutEvent(getByTestId("innerView"));
            const mock = getByTestId("mock");

            expect(mock.props.data).toEqual([
                {
                    labelStyle: {
                        fill: "red"
                    },
                    stylingKey: "key4",
                    x: "Formatted four",
                    y: 21
                },
                {
                    labelStyle: {
                        fill: "green"
                    },
                    x: "Formatted five",
                    y: 18
                },
                {
                    labelStyle: {
                        fill: "red"
                    },
                    stylingKey: "key2",
                    x: "Formatted two",
                    y: 5
                },
                {
                    labelStyle: {
                        fill: "green"
                    },
                    x: "Formatted three",
                    y: 3
                },
                {
                    labelStyle: {
                        fill: "watermelon",
                        fontSize: 11
                    },
                    stylingKey: "key1",
                    x: "Formatted one",
                    y: 1
                }
            ]);
        });
    });

    describe("padding", () => {
        it("prioritises side-specific padding", () => {
            const { getByTestId } = render(
                <PieDoughnutChart
                    {...createProps({
                        style: [
                            {
                                slices: {
                                    paddingTop: 1,
                                    paddingBottom: 2,
                                    paddingLeft: 3,
                                    paddingRight: 4,
                                    paddingHorizontal: 50,
                                    paddingVertical: 51,
                                    padding: 100
                                }
                            }
                        ]
                    })}
                />
            );
            fireLayoutEvent(getByTestId("innerView"));
            const mock = getByTestId("mock");

            expect(mock.props.padding).toEqual({
                top: 1,
                bottom: 2,
                left: 3,
                right: 4
            });
        });

        it("then plane-specific padding", () => {
            const { getByTestId } = render(
                <PieDoughnutChart
                    {...createProps({
                        style: [
                            {
                                slices: {
                                    paddingHorizontal: 50,
                                    paddingVertical: 51,
                                    padding: 100
                                }
                            }
                        ]
                    })}
                />
            );
            fireLayoutEvent(getByTestId("innerView"));
            const mock = getByTestId("mock");

            expect(mock.props.padding).toEqual({
                top: 51,
                bottom: 51,
                left: 50,
                right: 50
            });
        });

        it("then falls-back to padding", () => {
            const { getByTestId } = render(
                <PieDoughnutChart
                    {...createProps({
                        style: [
                            {
                                slices: {
                                    paddingVertical: 51,
                                    padding: 100
                                }
                            }
                        ]
                    })}
                />
            );
            fireLayoutEvent(getByTestId("innerView"));
            const mock = getByTestId("mock");

            expect(mock.props.padding).toEqual({
                top: 51,
                bottom: 51,
                left: 100,
                right: 100
            });
        });
    });
});

function createProps(opts: Partial<PieDoughnutChartProps<ChartStyle>> = {}): PieDoughnutChartProps<ChartStyle> {
    const { series = [], style = [], presentation = "pie", sortOrder = "ascending", showLabels = false } = opts;

    return {
        name: "PieDoughnutTestWidget",
        showLabels,
        sortOrder,
        presentation,
        series,
        style: [defaultStyle, ...style]
    };
}

const fireLayoutEvent = (view: ReactTestInstance): Thenable =>
    act(() => {
        fireEvent(view, "layout", {
            nativeEvent: {
                layout: {
                    width: 300
                }
            }
        });
    });

function setupBasicSeries(): SeriesType[] {
    const xAttribute = new ListAttributeValueBuilder<string>().build();
    const getXAttributeMock = jest.fn();
    getXAttributeMock.mockReturnValueOnce(new EditableValueBuilder<string>().withValue("one").build());
    getXAttributeMock.mockReturnValueOnce(new EditableValueBuilder<string>().withValue("two").build());
    xAttribute.get = getXAttributeMock;

    const yAttribute = new ListAttributeValueBuilder<Big>().build();
    const getYAttributeMock = jest.fn();
    getYAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(3)).build());
    getYAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(6)).build());
    yAttribute.get = getYAttributeMock;

    const sliceStylingKey = new ListAttributeValueBuilder<string>().build();
    const getStylingKeyMock = jest.fn();
    getStylingKeyMock.mockReturnValueOnce(new EditableValueBuilder<string>().withValue("key1").build());
    getStylingKeyMock.mockReturnValue(new EditableValueBuilder<string>().build());
    sliceStylingKey.get = getStylingKeyMock;

    return [
        {
            dataSource: ListValueBuilder().simple(),
            XAttribute: xAttribute,
            YAttribute: yAttribute,
            sliceStylingKey
        }
    ];
}

function setupComplexSeries(sortOrderToTest?: string): SeriesType[] {
    const xAttribute = new ListAttributeValueBuilder<string>().build();
    const getXAttributeMock = jest.fn();
    const setXAttributeMock = (value: string) =>
        getXAttributeMock.mockReturnValueOnce(new EditableValueBuilder<string>().withValue(value).build());
    ["one", "two", "three", "four", "five"].forEach(value => setXAttributeMock(value));
    xAttribute.get = getXAttributeMock;

    const yAttribute = new ListAttributeValueBuilder<Big>().build();
    const setYAttributeMock = (value: number) =>
        getYAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(value)).build());
    const getYAttributeMock = jest.fn();
    if (sortOrderToTest === "ascending") {
        [8, 36, 12, 11, 3].forEach(value => setYAttributeMock(value));
    } else if (sortOrderToTest === "descending") {
        [1, 5, 3, 21, 18, 19].forEach(value => setYAttributeMock(value));
    } else {
        [3, 6, 7, 12, 15].forEach(value => setYAttributeMock(value));
    }
    yAttribute.get = getYAttributeMock;

    const sliceStylingKey = new ListAttributeValueBuilder<string>().build();
    const getStylingKeyMock = jest.fn();
    const setStylingKeyMock = (value: string | undefined) =>
        getStylingKeyMock.mockReturnValueOnce(new EditableValueBuilder<string>().withValue(value).build());
    ["key1", "key2", undefined, "key4", undefined].forEach(value => setStylingKeyMock(value));
    sliceStylingKey.get = getStylingKeyMock;

    return [
        {
            dataSource: ListValueBuilder().withItems([
                { id: "1" },
                { id: "2" },
                { id: "3" },
                { id: "4" },
                { id: "5" }
            ] as ObjectItem[]),
            XAttribute: xAttribute,
            YAttribute: yAttribute,
            sliceStylingKey
        }
    ];
}
