import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { PieDoughnutChartPreviewProps } from "../typings/PieDoughnutChartProps";
import PieWithLabels from "./assets/pie-w-labels.svg";
import PieWithoutLabels from "./assets/pie-wo-labels.svg";
import PieWithLabelsDark from "./assets/pie-w-labels-dark.svg";
import PieWithoutLabelsDark from "./assets/pie-wo-labels-dark.svg";
import DoughnutWithLabels from "./assets/doughnut-w-labels.svg";
import DoughnutWithLabelsDark from "./assets/doughnut-w-labels-dark.svg";
import DoughnutWithoutLabels from "./assets/doughnut-wo-labels.svg";
import DoughnutWithoutLabelsDark from "./assets/doughnut-wo-labels-dark.svg";

export function getPreview(values: PieDoughnutChartPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const pieWithLabelsSVG = isDarkMode ? PieWithLabelsDark : PieWithLabels;
    const pieWithoutLabelsSVG = isDarkMode ? PieWithoutLabelsDark : PieWithoutLabels;
    const doughnutWithLabelsDarkSVG = isDarkMode ? DoughnutWithLabelsDark : DoughnutWithLabels;
    const doughnutWithoutLabelsDarkSVG = isDarkMode ? DoughnutWithoutLabelsDark : DoughnutWithoutLabels;
    return values.presentation === "pie"
        ? result(values.showLabels ? pieWithLabelsSVG : pieWithoutLabelsSVG)
        : result(values.showLabels ? doughnutWithLabelsDarkSVG : doughnutWithoutLabelsDarkSVG);

    function result(svg: string): StructurePreviewProps {
        return {
            type: "Image",
            document: decodeURIComponent(svg.replace("data:image/svg+xml,", "")),
            width: 285,
            height: 234
        };
    }
}
