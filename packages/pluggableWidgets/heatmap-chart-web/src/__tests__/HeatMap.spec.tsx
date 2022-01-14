import { createElement } from "react";
import { ChartWidget } from "@mendix/shared-charts";
import {
    buildListExpression,
    dynamicValue,
    EditableValueBuilder,
    ListAttributeValueBuilder,
    ListValueBuilder
} from "@mendix/piw-utils-internal";
import { mount, ReactWrapper } from "enzyme";
import { HeatMap } from "../HeatMap";
import Big from "big.js";
import { ObjectItem } from "mendix";
import { HeatMapContainerProps } from "../../typings/HeatMapProps";

jest.mock("@mendix/shared-charts", () => ({
    ChartWidget: jest.fn(() => null)
}));

describe("The HeatMap widget", () => {
    function renderHeatMap(props: Partial<HeatMapContainerProps>): ReactWrapper {
        return mount(
            <HeatMap
                name="line-chart-test"
                class="line-chart-class"
                showLegend={false}
                developerMode="basic"
                widthUnit="percentage"
                width={0}
                heightUnit="pixels"
                height={0}
                customLayout=""
                customConfigurations=""
                customSeriesOptions=""
                seriesDataSource={ListValueBuilder().simple()}
                seriesName={buildListExpression("name")}
                seriesValueAttribute={new ListAttributeValueBuilder<Big>().build()}
                enableThemeConfig={false}
                scaleColors={[]}
                showScale
                horizontalSortOrder="asc"
                verticalSortOrder="asc"
                smoothColor={false}
                showValues={false}
                valuesColor=""
                {...setupBasicAttributes()}
                {...props}
            />
        );
    }

    it("visualizes data as a heatmap chart", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("seriesOptions");
        expect(data).toHaveProperty("type", "heatmap");
    });

    it("sets proper label values on the data series based on seriesName", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("labels", [
            "item 0",
            "item 1",
            "item 2",
            "item 3",
            "item 4",
            "item 5",
            "item 6",
            "item 7",
            "item 8",
            "item 9",
            "item 10",
            "item 11"
        ]);
    });

    it("has a default colorscale", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("colorscale", [
            [0, "#17347B"],
            [0.5, "#0595DB"],
            [1, "#76CA02"]
        ]);
    });

    it("creates a color scale based on scaleColors property", () => {
        const heatmapChart = renderHeatMap({
            scaleColors: [
                { colour: "red", valuePercentage: 0 },
                { colour: "blue", valuePercentage: 100 }
            ]
        });
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("colorscale", [
            [0, "red"],
            [1, "blue"]
        ]);
    });

    it("sets unique x values on the data series based on the horizontalValueAttribute", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("x", ["x0", "x1", "x2"]);
    });

    it("sets unique y values on the data series based on the verticalValueAttribute", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("y", ["y0", "y1", "y2", "y3"]);
    });

    it("sets a proper z values matrix on the data series based on seriesValueAttribute", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("z");
        // @ts-expect-error we checked it
        const zValues: number[][] = data[0].z;
        expect(zValues).toHaveLength(4);
        zValues.forEach(values => {
            expect(values).toHaveLength(3);
        });
    });

    it("sets annotations with the z values on the data series based on showValues", () => {
        const heatmapChart = renderHeatMap({ showValues: true });
        const layout = heatmapChart.find(ChartWidget).prop("layoutOptions");
        expect(layout.annotations).toHaveLength(12);
        const annotationsTexts = layout.annotations?.map(anno => anno.text);
        allItems.forEach((_value, index) => {
            expect(annotationsTexts?.includes(index.toString())).toBe(true);
        });
    });

    it("sorts the z values on the data series based on the horizontalSortAttribute", () => {
        const horizontalSortAttribute = new ListAttributeValueBuilder<Big>().build();
        horizontalSortAttribute.get = allItems.reduce<jest.Mock>(
            (prev, _curr, index) =>
                prev.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(index)).build()),
            jest.fn()
        );
        const heatmapChart = renderHeatMap({
            horizontalSortAttribute,
            horizontalSortOrder: "desc"
        });
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        // @ts-expect-error we checked it
        const zValues: number[][] = data[0].z;
        expect(zValues).toEqual([
            [2, 1, 0],
            [5, 4, 3],
            [8, 7, 6],
            [11, 10, 9]
        ]);
    });

    it("sorts the z values on the data series based on the verticalSortAttribute", () => {
        const verticalSortAttribute = new ListAttributeValueBuilder<Big>().build();
        verticalSortAttribute.get = allItems.reduce<jest.Mock>(
            (prev, _curr, index) =>
                prev.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(index)).build()),
            jest.fn()
        );
        const heatmapChart = renderHeatMap({
            verticalSortAttribute,
            verticalSortOrder: "desc"
        });
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        // @ts-expect-error we checked it
        const zValues: number[][] = data[0].z;
        expect(zValues).toEqual([
            [11, 10, 9],
            [8, 7, 6],
            [5, 4, 3],
            [2, 1, 0]
        ]);
    });
});

const numberOfHorizontalItems = 3;
const numberOfVerticalItems = 4;
const numberOfItems = numberOfHorizontalItems * numberOfVerticalItems;

const allItems = new Array(numberOfItems).fill(null);

function setupBasicAttributes(): Partial<HeatMapContainerProps> {
    const seriesDataSource = ListValueBuilder().withItems(
        allItems.map((_value, index) => ({ id: index.toString() } as ObjectItem))
    );

    const seriesName = buildListExpression("name");
    seriesName.get = allItems.reduce<jest.Mock>(
        (prev, _curr, index) => prev.mockReturnValueOnce(dynamicValue(`item ${index}`)),
        jest.fn()
    );

    const seriesValueAttribute = new ListAttributeValueBuilder<Big>().build();
    seriesValueAttribute.get = allItems.reduce<jest.Mock>(
        (prev, _curr, index) =>
            prev.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(index)).build()),
        jest.fn()
    );

    const horizontalAxisAttribute = new ListAttributeValueBuilder<string>().build();
    horizontalAxisAttribute.get = allItems.reduce<jest.Mock>(
        (prev, _curr, index) =>
            prev.mockReturnValueOnce(
                new EditableValueBuilder<string>().withValue(`x${index % numberOfHorizontalItems}`).build()
            ),
        jest.fn()
    );

    const verticalAxisAttribute = new ListAttributeValueBuilder<string>().build();
    verticalAxisAttribute.get = allItems.reduce<jest.Mock>(
        (prev, _curr, index) =>
            prev.mockReturnValueOnce(
                new EditableValueBuilder<string>().withValue(`y${Math.floor(index / numberOfHorizontalItems)}`).build()
            ),
        jest.fn()
    );

    return {
        seriesDataSource,
        seriesName,
        seriesValueAttribute,
        horizontalAxisAttribute,
        verticalAxisAttribute
    };
}
