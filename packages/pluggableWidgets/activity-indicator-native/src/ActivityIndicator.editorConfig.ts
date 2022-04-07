import { RowLayoutProps } from "@mendix/piw-utils-internal";
import { ActivityIndicatorPreviewProps } from "../typings/ActivityIndicatorProps";

import StructurePreviewActivityIndicatorPrimaryLightSVG from "./assets/ActivityIndicator.primary.light.svg";
import StructurePreviewActivityIndicatorPrimaryDarkSVG from "./assets/ActivityIndicator.primary.dark.svg";

export const getPreview = (_: ActivityIndicatorPreviewProps, isDarkMode: boolean): RowLayoutProps => ({
    type: "RowLayout",
    borders: false,
    padding: 8,
    columnSize: "grow",
    children: [
        {
            type: "Image",
            document: decodeURIComponent(
                (isDarkMode
                    ? StructurePreviewActivityIndicatorPrimaryDarkSVG
                    : StructurePreviewActivityIndicatorPrimaryLightSVG
                ).replace("data:image/svg+xml,", "")
            ),
            width: 24,
            height: 24
        }
    ]
});
