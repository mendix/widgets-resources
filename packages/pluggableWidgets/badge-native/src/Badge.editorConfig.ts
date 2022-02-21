import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { BadgePreviewProps } from "../typings/BadgeProps";

import badgeSvgDark from "./assets/Badge.dark.svg";
import badgeSvgLight from "./assets/Badge.light.svg";

export function getPreview(_: BadgePreviewProps, isDarkMode: boolean): StructurePreviewProps {
    return {
        type: "Image",
        document: decodeURIComponent((isDarkMode ? badgeSvgDark : badgeSvgLight).replace("data:image/svg+xml,", "")),
        width: 60
    };
}
