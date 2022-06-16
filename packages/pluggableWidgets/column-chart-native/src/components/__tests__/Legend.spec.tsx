import { createElement } from "react";
import { render } from "@testing-library/react-native";

import { Legend, LegendProps } from "../Legend";
import { defaultColumnChartStyle } from "../../ui/Styles";

describe("Legend", () => {
    let defaultProps: LegendProps;

    beforeEach(() => {
        defaultProps = {
            series: [{ name: "Bar 1" }, { name: "Bar 2" }],
            style: {
                ...defaultColumnChartStyle.legend
            },
            seriesColors: ["#0595DB", "green"]
        };
    });

    it("renders", () => {
        const component = render(<Legend {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("doesn't render series when there is no series name", () => {
        defaultProps.series[0].name = undefined;
        const component = render(<Legend {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("doesn't render when there are no series", () => {
        defaultProps.series = [];
        const component = render(<Legend {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
