import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import checkedSVG from "./assets/checked.svg";
import checkedSVGDark from "./assets/checked-dark.svg";

export function getPreview(_: StructurePreviewProps, isDarkMode: boolean): StructurePreviewProps {
    return {
        type: "Image",
        document: decodeURIComponent((isDarkMode ? checkedSVGDark : checkedSVG).replace("data:image/svg+xml,", "")),
        width: 80
    };
}
