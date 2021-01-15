import { aggregateGridPadding, mapToAxisStyle, mapToGridStyle, mapToLineStyle, mapToMarkerStyle } from "../StyleUtils";
import { LineChartAxisStyle, LineChartGridStyle, LineChartLineStyle } from "../../ui/Styles";

describe("StyleMappers", () => {
    describe("mapToGridStyle", () => {
        it("maps the relevant styles", () => {
            const gridStyle = {
                backgroundColor: "orange",
                dashArray: "5,5",
                lineColor: "transparent",
                lineWidth: 10,
                padding: 1,
                paddingHorizontal: 2,
                paddingVertical: 3,
                paddingBottom: 30,
                paddingLeft: 30,
                paddingRight: 10,
                paddingTop: 10
            };

            const expectedResult = {
                background: {
                    fill: gridStyle?.backgroundColor
                }
            };

            expect(mapToGridStyle(gridStyle)).toStrictEqual(expectedResult);
        });
    });

    describe("mapToAxisStyle", () => {
        it("maps the relevant styles", () => {
            const gridStyle = {
                backgroundColor: "orange",
                dashArray: "5,5",
                lineColor: "transparent",
                lineWidth: 10,
                padding: 1,
                paddingHorizontal: 2,
                paddingVertical: 3,
                paddingBottom: 30,
                paddingLeft: 30,
                paddingRight: 10,
                paddingTop: 10
            };

            const axisStyle: LineChartAxisStyle<"Y"> = {
                color: "green",
                dashArray: "10,10",
                fontFamily: "Times New Roman",
                fontSize: 20,
                fontStyle: "italic",
                fontWeight: "100",
                lineColor: "purple",
                lineWidth: 5,
                label: {
                    relativePositionGrid: "left",
                    alignSelf: "center"
                }
            };

            const expectedResult = {
                axis: {
                    stroke: axisStyle?.lineColor,
                    strokeDasharray: axisStyle?.dashArray,
                    strokeWidth: axisStyle?.lineWidth
                },
                grid: {
                    stroke: gridStyle?.lineColor,
                    strokeDasharray: gridStyle?.dashArray,
                    strokeWidth: gridStyle?.lineWidth
                },
                tickLabels: {
                    fill: axisStyle.color,
                    fontFamily: axisStyle?.fontFamily,
                    fontSize: axisStyle?.fontSize,
                    fontStyle: axisStyle?.fontStyle,
                    fontWeight: axisStyle?.fontWeight
                }
            };

            expect(mapToAxisStyle(gridStyle, axisStyle)).toStrictEqual(expectedResult);
        });
    });

    describe("mapToLineStyle", () => {
        it("maps the relevant styles", () => {
            const lineStyle: LineChartLineStyle["line"] = {
                dashArray: "10,3",
                ending: "flat",
                lineColor: "rgba(255,0,0,0.3)",
                lineWidth: 15
            };

            const expectedResult = {
                data: {
                    stroke: lineStyle?.lineColor,
                    strokeDasharray: lineStyle?.dashArray,
                    strokeLinecap: lineStyle?.ending,
                    strokeWidth: lineStyle?.lineWidth
                }
            };

            expect(mapToLineStyle(lineStyle)).toStrictEqual(expectedResult);
        });
    });

    describe("mapToMarkerStyle", () => {
        it("maps the relevant styles", () => {
            const markersStyle: LineChartLineStyle["markers"] = {
                backgroundColor: "rgba(255,0,255,0.3)",
                borderColor: "red",
                borderWidth: 3,
                display: "onTop",
                size: 10,
                symbol: "diamond"
            };

            const expectedResult = {
                data: {
                    fill: markersStyle?.backgroundColor,
                    stroke: markersStyle?.borderColor,
                    strokeWidth: markersStyle?.borderWidth
                }
            };

            expect(mapToMarkerStyle(markersStyle)).toStrictEqual(expectedResult);
        });
    });
});

describe("aggregateGridPadding", () => {
    let gridStyle: LineChartGridStyle;

    beforeEach(() => {
        gridStyle = {
            backgroundColor: "blue",
            padding: 10
        };
    });

    it("aggregates top padding with correct precedence", () => {
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ top: 10 });

        gridStyle.paddingVertical = 5;
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ top: 5 });

        gridStyle.paddingTop = 1;
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ top: 1 });
    });

    it("aggregates bottom padding with correct precedence", () => {
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ bottom: 10 });

        gridStyle.paddingVertical = 5;
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ bottom: 5 });

        gridStyle.paddingBottom = 1;
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ bottom: 1 });
    });

    it("aggregates left padding with correct precedence", () => {
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ left: 10 });

        gridStyle.paddingHorizontal = 5;
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ left: 5 });

        gridStyle.paddingLeft = 1;
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ left: 1 });
    });

    it("aggregates right padding with correct precedence", () => {
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ right: 10 });

        gridStyle.paddingHorizontal = 5;
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ right: 5 });

        gridStyle.paddingRight = 1;
        expect(aggregateGridPadding(gridStyle)).toMatchObject({ right: 1 });
    });

    it("returns undefined when no grid style is passed", () => {
        expect(aggregateGridPadding(undefined)).toBeUndefined();
    });
});
