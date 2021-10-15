import { createElement } from "react";
import { shallow } from "enzyme";
import { ChartWidgetProps, ChartWidget } from "../ChartWidget";
import ReactPlotlyChart from "react-plotly.js";

jest.mock("react-plotly.js", () => (props: any) => {
    const MockName = "react-plotly-chart-mock";
    // @ts-expect-error lower case custom name to make clear it's a mock
    return <MockName {...props} />;
});

const defaultProps: ChartWidgetProps = {
    className: "",
    data: [
        {
            x: [1, 2],
            y: [3, 4]
        }
    ] as ChartWidgetProps["data"],
    widthUnit: "percentage" as ChartWidgetProps["widthUnit"],
    width: 0,
    heightUnit: "pixels" as ChartWidgetProps["heightUnit"],
    height: 0,
    xAxisLabel: undefined,
    yAxisLabel: undefined,
    showLegend: false,
    gridLinesMode: "both",
    customLayout: "",
    showSidebarEditor: false,
    customConfig: ""
};

describe("LineChart", () => {
    it("shows the legend when showLegend is true", () => {
        const lineChart = shallow(<ChartWidget {...defaultProps} showLegend />);
        expect(lineChart.find(ReactPlotlyChart).prop("layout")).toHaveProperty("showlegend", true);
    });

    it("shows the legend when showLegend is false", () => {
        const lineChart = shallow(<ChartWidget {...defaultProps} showLegend={false} />);
        expect(lineChart.find(ReactPlotlyChart).prop("layout")).toHaveProperty("showlegend", false);
    });

    it("properly sets the X axis title", () => {
        const lineChart = shallow(<ChartWidget {...defaultProps} xAxisLabel="This is the X axis title" />);
        expect(lineChart.find(ReactPlotlyChart).prop("layout")).toHaveProperty(
            "xaxis.title",
            "This is the X axis title"
        );
    });

    it("properly sets the Y axis title", () => {
        const lineChart = shallow(<ChartWidget {...defaultProps} yAxisLabel="This is the Y axis title" />);
        expect(lineChart.find(ReactPlotlyChart).prop("layout")).toHaveProperty(
            "yaxis.title",
            "This is the Y axis title"
        );
    });

    describe("properly sets the properties for the gridlines", () => {
        it("when gridLinesMode is set to 'both'", () => {
            const lineChart = shallow(<ChartWidget {...defaultProps} gridLinesMode="both" />);
            const reactPlotlyChart = lineChart.find(ReactPlotlyChart);
            expect(reactPlotlyChart.prop("layout")).toHaveProperty("xaxis.showgrid", true);
            expect(reactPlotlyChart.prop("layout")).toHaveProperty("yaxis.showgrid", true);
        });

        it("when gridLinesMode is set to 'horizontal'", () => {
            const lineChart = shallow(<ChartWidget {...defaultProps} gridLinesMode="horizontal" />);
            const reactPlotlyChart = lineChart.find(ReactPlotlyChart);
            expect(reactPlotlyChart.prop("layout")).toHaveProperty("xaxis.showgrid", false);
            expect(reactPlotlyChart.prop("layout")).toHaveProperty("yaxis.showgrid", true);
        });

        it("when gridLinesMode is set to 'vertical'", () => {
            const lineChart = shallow(<ChartWidget {...defaultProps} gridLinesMode="vertical" />);
            const reactPlotlyChart = lineChart.find(ReactPlotlyChart);
            expect(reactPlotlyChart.prop("layout")).toHaveProperty("xaxis.showgrid", true);
            expect(reactPlotlyChart.prop("layout")).toHaveProperty("yaxis.showgrid", false);
        });

        it("when gridLinesMode is set to 'none'", () => {
            const lineChart = shallow(<ChartWidget {...defaultProps} gridLinesMode="none" />);
            const reactPlotlyChart = lineChart.find(ReactPlotlyChart);
            expect(reactPlotlyChart.prop("layout")).toHaveProperty("xaxis.showgrid", false);
            expect(reactPlotlyChart.prop("layout")).toHaveProperty("yaxis.showgrid", false);
        });
    });
});
