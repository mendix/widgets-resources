import { createElement } from "react";
import { render } from "react-native-testing-library";

import { Legend, LegendProps } from "../Legend";
import { defaultLineChartStyle } from "../../ui/Styles";

describe("Legend", () => {
    let defaultProps: LegendProps;

    beforeEach(() => {
        defaultProps = {
            series: [{ name: "Line 1" }, { name: "Line 2" }],
            style: {
                ...defaultLineChartStyle.legend
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
