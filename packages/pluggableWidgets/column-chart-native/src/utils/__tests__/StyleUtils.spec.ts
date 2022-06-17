import { aggregateGridPadding, mapToAxisStyle, mapToGridStyle, mapToColumnStyles } from "../StyleUtils";
import { ColumnChartAxisStyle, ColumnChartGridStyle, ColumnChartStyle } from "../../ui/Styles";

describe("StyleMappers", () => {
    describe("mapToGridStyle", () => {
        it("maps the relevant styles", () => {
            const gridStyle: ColumnChartGridStyle = {
                backgroundColor: "orange",
                dashArray: "5,5",
                lineColor: "transparent",
                width: 10,
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
            const gridStyle: ColumnChartGridStyle = {
                backgroundColor: "orange",
                dashArray: "5,5",
                lineColor: "transparent",
                width: 10,
                padding: 1,
                paddingHorizontal: 2,
                paddingVertical: 3,
                paddingBottom: 30,
                paddingLeft: 30,
                paddingRight: 10,
                paddingTop: 10
            };

            const axisStyle: ColumnChartAxisStyle<"Y"> = {
                color: "green",
                dashArray: "10,10",
                fontFamily: "Times New Roman",
                fontSize: 20,
                fontStyle: "italic",
                fontWeight: "100",
                lineColor: "purple",
                width: 5,
                label: {
                    relativePositionGrid: "left",
                    alignSelf: "center"
                }
            };

            const expectedResult = {
                axis: {
                    stroke: axisStyle?.lineColor,
                    strokeDasharray: axisStyle?.dashArray,
                    strokeWidth: axisStyle?.width
                },
                grid: {
                    stroke: gridStyle?.lineColor,
                    strokeDasharray: gridStyle?.dashArray,
                    strokeWidth: gridStyle?.width
                },
                tickLabels: {
                    fill: axisStyle?.color,
                    fontFamily: axisStyle?.fontFamily,
                    fontSize: axisStyle?.fontSize,
                    fontStyle: axisStyle?.fontStyle,
                    fontWeight: axisStyle?.fontWeight
                }
            };

            expect(mapToAxisStyle(gridStyle, axisStyle)).toStrictEqual(expectedResult);
        });
    });

    describe("mapToBarStyles", () => {
        it("maps the relevant styles", () => {
            const styles: NonNullable<
                NonNullable<NonNullable<NonNullable<ColumnChartStyle["columns"]>["customColumnStyles"]>["key"]>
            > = {
                column: {
                    ending: 4,
                    columnColor: "rgba(255,0,0,0.3)",
                    width: 15
                },
                label: {
                    fontFamily: "Times New Roman",
                    fontSize: 20,
                    fontStyle: "italic",
                    fontWeight: "100"
                }
            };

            const expectedResult = {
                column: {
                    fill: styles.column?.columnColor
                },
                labels: {
                    fill: styles.column?.columnColor,
                    fontFamily: styles.label?.fontFamily,
                    fontSize: styles.label?.fontSize,
                    fontStyle: styles.label?.fontStyle,
                    fontWeight: styles.label?.fontWeight
                },
                width: styles.column?.width,
                cornerRadius: styles.column?.ending
            };

            expect(mapToColumnStyles("red", styles)).toStrictEqual(expectedResult);
        });

        it("falls back to fallback palette colour", () => {
            const fallbackColor = "red";
            const styles: NonNullable<
                NonNullable<NonNullable<NonNullable<ColumnChartStyle["columns"]>["customColumnStyles"]>["key"]>
            > = {
                column: {
                    ending: 4,
                    width: 15
                },
                label: {
                    fontFamily: "Times New Roman",
                    fontSize: 20,
                    fontStyle: "italic",
                    fontWeight: "100"
                }
            };

            const expectedResult = {
                column: {
                    fill: fallbackColor
                },
                labels: {
                    fill: fallbackColor,
                    fontFamily: styles.label?.fontFamily,
                    fontSize: styles.label?.fontSize,
                    fontStyle: styles.label?.fontStyle,
                    fontWeight: styles.label?.fontWeight
                },
                width: styles.column?.width,
                cornerRadius: styles.column?.ending
            };

            expect(mapToColumnStyles("red", styles)).toStrictEqual(expectedResult);
        });
    });
});

describe("aggregateGridPadding", () => {
    let gridStyle: ColumnChartGridStyle;

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
