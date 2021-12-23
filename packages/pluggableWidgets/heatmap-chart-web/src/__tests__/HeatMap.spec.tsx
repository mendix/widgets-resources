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

    it("sets the hole prop on the data series based on the chartFormat value", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("hole", 0.4);
    });

    it("sets proper label values on the data series based on seriesName", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("labels", ["first series", "second series"]);
    });

    it("sets proper values on the data series based on seriesValueAttribute", () => {
        const heatmapChart = renderHeatMap({});
        const data = heatmapChart.find(ChartWidget).prop("data");
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("values", [1, 2]);
    });
});

function setupBasicAttributes(): Partial<HeatMapContainerProps> {
    const seriesName = buildListExpression("name");
    seriesName.get = jest
        .fn()
        .mockReturnValueOnce(dynamicValue("first series"))
        .mockReturnValueOnce(dynamicValue("second series"));

    const seriesDataSource = ListValueBuilder().simple();

    const seriesValueAttribute = new ListAttributeValueBuilder<Big>().build();
    seriesValueAttribute.get = jest
        .fn()
        .mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(1)).build())
        .mockReturnValueOnce(new EditableValueBuilder<Big>().withValue(new Big(2)).build());

    return {
        seriesDataSource,
        seriesName,
        seriesValueAttribute
    };
}
