import { createElement } from "react";
import { ChartWidget } from "@mendix/shared-charts";
import {
    EditableValueBuilder,
    ListAttributeValueBuilder,
    ListValueBuilder,
    dynamicValue
} from "@mendix/piw-utils-internal";
import Big from "big.js";
import { mount, ReactWrapper } from "enzyme";
import { BubbleChart } from "../BubbleChart";
import { LinesType } from "../../typings/BubbleChartProps";

jest.mock("@mendix/shared-charts", () => ({
    ChartWidget: jest.fn(() => null)
}));

describe("The Bubble widget", () => {
    function renderBubbleChart(configs: Array<Partial<LinesType>>): ReactWrapper {
        return mount(
            <BubbleChart
                name="bubble-chart-test"
                class="bubble-chart-class"
                lines={configs.map(setupBasicSeries)}
                showLegend={false}
                widthUnit="percentage"
                width={0}
                heightUnit="pixels"
                height={0}
                gridLines="none"
                customLayout=""
                customConfigurations=""
                enableThemeConfig={false}
                enableAdvancedOptions={false}
                enableDeveloperMode={false}
            />
        );
    }

    it("visualizes data as a bubble chart", () => {
        const bubbleChart = renderBubbleChart([{}]);
        const data = bubbleChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("type", "scatter");
        expect(data[0]).toHaveProperty("mode", "markers");
    });

    it("sets the marker color on the data series based on the markerColor value", () => {
        const bubbleChart = renderBubbleChart([{ markerColor: dynamicValue("red") }, { markerColor: undefined }]);
        const data = bubbleChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(2);
        expect(data[0]).toHaveProperty("marker.color", "red");
        expect(data[1]).toHaveProperty("marker.color", undefined);
    });

    it("sets the appropriate transforms on the data series based on the aggregation type", () => {
        const bubbleChart = renderBubbleChart([{ aggregationType: "none" }, { aggregationType: "avg" }]);
        const data = bubbleChart.find(ChartWidget).prop("data");
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
        markerColor: overwriteConfig.markerColor ?? undefined,
        staticDataSource: ListValueBuilder().simple(),
        staticXAttribute: xAttribute,
        staticYAttribute: yAttribute,
        autosize: true,
        sizeref: 10
    };
}
