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
import { LineChart } from "../LineChart";
import { LinesType } from "../../typings/LineChartProps";

jest.mock("@mendix/shared-charts", () => ({
    ChartWidget: jest.fn(() => null)
}));

describe("The LineChart widget", () => {
    function renderLineChart(configs: Array<Partial<LinesType>>): ReactWrapper {
        return mount(
            <LineChart
                name="line-chart-test"
                class="line-chart-class"
                lines={configs.map(setupBasicSeries)}
                showLegend={false}
                developerMode="basic"
                widthUnit="percentage"
                width={0}
                heightUnit="pixels"
                height={0}
                gridLines="none"
                customLayout=""
                customConfigurations=""
            />
        );
    }
    it("visualizes data as a line chart", () => {
        const lineChart = renderLineChart([{}]);
        const data = lineChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("type", "scatter");
    });

    it("sets the mode on the data series based on the lineStyle value", () => {
        const lineChart = renderLineChart([{ lineStyle: "lineWithMarkers" }, { lineStyle: "line" }]);
        const data = lineChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("mode", "lines+markers");
        expect(data[1]).toHaveProperty("mode", "lines");
    });

    it("sets the line shape on the data series based on the interpolation value", () => {
        const lineChart = renderLineChart([{ interpolation: "linear" }, { interpolation: "spline" }]);
        const data = lineChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("line.shape", "linear");
        expect(data[1]).toHaveProperty("line.shape", "spline");
    });

    it("sets the line color on the data series based on the lineColor value", () => {
        const lineChart = renderLineChart([{ lineColor: dynamicValue("red") }, { lineColor: undefined }]);
        const data = lineChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("line.color", "red");
        expect(data[1]).toHaveProperty("line.color", undefined);
    });

    it("sets the marker color on the data series based on the markerColor value", () => {
        const lineChart = renderLineChart([{ markerColor: undefined }, { lineColor: dynamicValue("blue") }]);
        const data = lineChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("line.color", undefined);
        expect(data[1]).toHaveProperty("line.color", "blue");
    });
});

function setupBasicSeries(overwriteConfig: Partial<LinesType>): LinesType {
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
        interpolation: overwriteConfig.interpolation ?? "linear",
        lineStyle: overwriteConfig.lineStyle ?? "line",
        lineColor: overwriteConfig.lineColor ?? undefined,
        markerColor: overwriteConfig.markerColor ?? undefined,
        staticDataSource: ListValueBuilder().simple(),
        staticXAttribute: xAttribute,
        staticYAttribute: yAttribute
    };
}
