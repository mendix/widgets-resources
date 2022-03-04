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
import { TimeSeries } from "../TimeSeries";
import { LinesType, TimeSeriesContainerProps } from "../../typings/TimeSeriesProps";

jest.mock("@mendix/shared-charts", () => ({
    ChartWidget: jest.fn(() => null)
}));

describe("The TimeSeries widget", () => {
    function renderTimeSeries(
        configs: Array<Partial<LinesType>>,
        props?: Partial<TimeSeriesContainerProps>
    ): ReactWrapper {
        return mount(
            <TimeSeries
                name="time-series-test"
                class="time-series-class"
                lines={configs.map(setupBasicSeries)}
                showLegend={false}
                enableAdvancedOptions={false}
                enableDeveloperMode={false}
                widthUnit="percentage"
                width={0}
                heightUnit="pixels"
                height={0}
                gridLines="none"
                customLayout=""
                customConfigurations=""
                enableThemeConfig={false}
                yAxisRangeMode="tozero"
                showRangeSlider
                {...props}
            />
        );
    }
    it("visualizes data as a line chart", () => {
        const timeSeries = renderTimeSeries([{}]);
        const seriesOptions = timeSeries.find(ChartWidget).prop("seriesOptions");
        expect(seriesOptions).toHaveProperty("type", "scatter");
    });

    it("sets the mode on the data series based on the lineStyle value", () => {
        const timeSeries = renderTimeSeries([{ lineStyle: "lineWithMarkers" }, { lineStyle: "line" }]);
        const data = timeSeries.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("mode", "lines+markers");
        expect(data[1]).toHaveProperty("mode", "lines");
    });

    it("sets the line shape on the data series based on the interpolation value", () => {
        const timeSeries = renderTimeSeries([{ interpolation: "linear" }, { interpolation: "spline" }]);
        const data = timeSeries.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("line.shape", "linear");
        expect(data[1]).toHaveProperty("line.shape", "spline");
    });

    it("sets the line color on the data series based on the lineColor value", () => {
        const timeSeries = renderTimeSeries([{ lineColor: dynamicValue("red") }, { lineColor: undefined }]);
        const data = timeSeries.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("line.color", "red");
        expect(data[1]).toHaveProperty("line.color", undefined);
    });

    it("sets the marker color on the data series based on the markerColor value", () => {
        const timeSeries = renderTimeSeries([{ markerColor: undefined }, { markerColor: dynamicValue("blue") }]);
        const data = timeSeries.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("marker.color", undefined);
        expect(data[1]).toHaveProperty("marker.color", "blue");
    });

    it("sets the appropriate transforms on the data series based on the aggregation type", () => {
        const timeSeries = renderTimeSeries([{ aggregationType: "none" }, { aggregationType: "avg" }]);
        const data = timeSeries.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("transforms", []);
        expect(data[1]).toHaveProperty("transforms", [
            {
                type: "aggregate",
                groups: ["01/01/2022", "02/01/2022"],
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

    it("sets the area fill color on the data series based on fillColor", () => {
        const timeSeries = renderTimeSeries([{ fillColor: dynamicValue("red") }]);
        const data = timeSeries.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("fillcolor", "red");
    });

    it("sets rangeslider visibility on the layout configuration based on showRangeSlider", () => {
        const timeSeries = renderTimeSeries([], { showRangeSlider: true });
        const layoutOptions = timeSeries.find(ChartWidget).prop("layoutOptions");
        expect(layoutOptions).toHaveProperty("xaxis.rangeslider.visible", true);
    });

    it("sets yaxis rangemode on the layout configuration based on yAxisRangeMode", () => {
        const timeSeries = renderTimeSeries([], { yAxisRangeMode: "nonnegative" });
        const layoutOptions = timeSeries.find(ChartWidget).prop("layoutOptions");
        expect(layoutOptions).toHaveProperty("yaxis.rangemode", "nonnegative");
    });
});

function setupBasicSeries(overwriteConfig: Partial<LinesType>): LinesType {
    const xAttribute = new ListAttributeValueBuilder<Date>().build();
    const getXAttributeMock = jest.fn();

    const firstDate = new Date("2022-01-01");
    jest.spyOn(firstDate, "toLocaleDateString").mockReturnValue("01/01/2022");
    getXAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Date>().withValue(firstDate).build());

    const secondDate = new Date("2022-01-02");
    jest.spyOn(secondDate, "toLocaleDateString").mockReturnValue("02/01/2022");
    getXAttributeMock.mockReturnValueOnce(new EditableValueBuilder<Date>().withValue(secondDate).build());

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
        fillColor: overwriteConfig.fillColor ?? undefined,
        staticDataSource: ListValueBuilder().simple(),
        staticXAttribute: xAttribute,
        staticYAttribute: yAttribute,
        enableFillArea: true
    };
}
