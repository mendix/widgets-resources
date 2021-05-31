import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import checkedSVG from "./assets/checked.svg";

export function getPreview(): StructurePreviewProps {
    return {
        type: "Image",
        document: decodeURIComponent(checkedSVG.replace("data:image/svg+xml,", "")),
        width: 80
    };
}
