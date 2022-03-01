import { createElement } from "react";
import { ChartWidget } from "@mendix/shared-charts";
import {
    dynamicValue,
    EditableValueBuilder,
    ListAttributeValueBuilder,
    ListValueBuilder
} from "@mendix/piw-utils-internal";
import Big from "big.js";
import { mount, ReactWrapper } from "enzyme";
import { ColumnChartContainerProps, SeriesType } from "../../typings/ColumnChartProps";
import { ColumnChart } from "../ColumnChart";

jest.mock("@mendix/shared-charts", () => ({
    ChartWidget: jest.fn(() => null)
}));

describe("The ColumnChart widget", () => {
    function renderColumnChart(
        configs: Array<Partial<SeriesType>>,
        chartProps?: Partial<ColumnChartContainerProps>
    ): ReactWrapper {
        return mount(
            <ColumnChart
                name="column-chart-test"
                class="column-chart-class"
                barmode="group"
                series={configs.map(setupBasicSeries)}
                showLegend={false}
                developerMode={false}
                widthUnit="percentage"
                width={0}
                heightUnit="pixels"
                height={0}
                gridLines="none"
                customLayout=""
                customConfigurations=""
                enableThemeConfig={false}
                advancedOptions={false}
                {...chartProps}
            />
        );
    }

    it("visualizes data as a bar chart", () => {
        const columnChart = renderColumnChart([{}]);
        const seriesOptions = columnChart.find(ChartWidget).prop("seriesOptions");
        expect(seriesOptions).toHaveProperty("type", "bar");
        expect(seriesOptions).toHaveProperty("orientation", "v");
    });

    it("sets the bar color on the data series based on the barColor value", () => {
        const columnChart = renderColumnChart([{ barColor: dynamicValue("red") }, { barColor: undefined }]);
        const data = columnChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("marker.color", "red");
        expect(data[1]).toHaveProperty("marker.color", undefined);
    });

    it("sets the appropriate transforms on the data series based on the aggregation type", () => {
        const columnChart = renderColumnChart([{ aggregationType: "none" }, { aggregationType: "avg" }]);
        const data = columnChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("transforms", []);
        expect(data[1]).toHaveProperty("transforms", [
            {
                type: "aggregate",
                groups: ["1", "2"],
                aggregations: [
                    {
                        target: "y",
                        enabled: true,
                        func: "avg"
                    }
                ]
            }
        ]);
    });

    it("sets the appropriate barmode on the layout based on the barmode type", () => {
        const columnChart = renderColumnChart([], { barmode: "stack" });
        const layoutOptions = columnChart.find(ChartWidget).prop("layoutOptions");
        expect(layoutOptions).toHaveProperty("barmode", "stack");
    });
});

function setupBasicSeries(overwriteConfig: Partial<SeriesType>): SeriesType {
    const xAttribute = new ListAttributeValueBuilder<Big>().build();
    const getXAttributeMock = jest.fn();
    getXAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(1)).build());
    getXAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(2)).build());
    xAttribute.get = getXAttributeMock;

    const yAttribute = new ListAttributeValueBuilder<Big>().build();
    const getYAttributeMock = jest.fn();
    getYAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(3)).build());
    getYAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(6)).build());
    yAttribute.get = getYAttributeMock;

    return {
        dataSet: "static",
        customSeriesOptions: overwriteConfig.customSeriesOptions ?? "",
        aggregationType: overwriteConfig.aggregationType ?? "avg",
        barColor: overwriteConfig.barColor ?? undefined,
        staticDataSource: ListValueBuilder().simple(),
        staticXAttribute: xAttribute,
        staticYAttribute: yAttribute
    };
}
