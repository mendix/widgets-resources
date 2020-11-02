import { createElement } from "react";
import { render } from "react-native-testing-library";

import { Legend, LegendProps } from "../Legend";

describe("Legend", () => {
    let defaultProps: LegendProps;

    beforeEach(() => {
        defaultProps = {
            series: [
                { name: "Line 1", stylePropertyName: "line1" },
                { name: "Line 2", stylePropertyName: "line2" }
            ],
            style: {
                series: {
                    line1: {
                        line: {
                            data: { stroke: "#0595DB" }
                        },
                        markers: {
                            data: { fill: "#035E8C" },
                            display: "underneath"
                        }
                    },
                    line2: {
                        line: {
                            data: { stroke: "green" }
                        }
                    }
                }
            }
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

    it("doesn't render series when it cannot retrieve a background color from the series style property", () => {
        defaultProps.style.series!.line2!.line!.data! = {};
        const component = render(<Legend {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("doesn't render when there are no series", () => {
        defaultProps.series = [];
        const component = render(<Legend {...defaultProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
