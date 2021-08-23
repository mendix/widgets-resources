import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { PieDoughnutChartPreviewProps } from "../typings/PieDoughnutChartProps";
import PieWithLabels from "./assets/pie-w-labels.svg";
import PieWithoutLabels from "./assets/pie-wo-labels.svg";
import DoughnutWithLabels from "./assets/doughnut-w-labels.svg";
import DoughnutWithoutLabels from "./assets/doughnut-wo-labels.svg";

export function getPreview(values: PieDoughnutChartPreviewProps): StructurePreviewProps {
    if (values.presentation === "pie") {
        if (values.showLabels) {
            return result(PieWithLabels);
        }

        return result(PieWithoutLabels);
    }

    if (values.showLabels) {
        return result(DoughnutWithLabels);
    }

    return result(DoughnutWithoutLabels);

    function result(svg: string): StructurePreviewProps {
        return {
            type: "Image",
            document: decodeURIComponent(svg.replace("data:image/svg+xml,", "")),
            width: 285,
            height: 234
        };
    }
}
