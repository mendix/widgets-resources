import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { PieDoughnutChartPreviewProps } from "../typings/PieDoughnutChartProps";
import PieWithLabels from "./assets/pie-w-labels.svg";
import PieWithoutLabels from "./assets/pie-wo-labels.svg";
import DoughnutWithLabels from "./assets/doughnut-w-labels.svg";
import DoughnutWithoutLabels from "./assets/doughnut-wo-labels.svg";

export function getPreview(values: PieDoughnutChartPreviewProps): StructurePreviewProps {
    return values.presentation === "pie"
        ? result(values.showLabels ? PieWithLabels : PieWithoutLabels)
        : result(values.showLabels ? DoughnutWithLabels : DoughnutWithoutLabels);

    function result(svg: string): StructurePreviewProps {
        return {
            type: "Image",
            document: decodeURIComponent(svg.replace("data:image/svg+xml,", "")),
            width: 285,
            height: 234
        };
    }
}
