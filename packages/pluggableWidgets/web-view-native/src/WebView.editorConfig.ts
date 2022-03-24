import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import vewViewGlobeDark from "./assets/WebViewGlobe.dark.svg";
import vewViewGlobeLight from "./assets/WebViewGlobe.light.svg";

import { WebViewPreviewProps } from "../typings/WebViewProps";

export const getPreview = (values: WebViewPreviewProps, isDarkMode: boolean): StructurePreviewProps => ({
    type: "Container",
    borders: true,
    backgroundColor: isDarkMode ? "#3E3E3E" : "#F2F2F3",
    children: [
        {
            type: "RowLayout",
            columnSize: "grow",
            padding: 12,
            children: [
                {
                    type: "Container"
                },
                {
                    type: "Image",
                    document: decodeURIComponent(
                        (isDarkMode ? vewViewGlobeDark : vewViewGlobeLight).replace("data:image/svg+xml,", "")
                    ),
                    width: 30
                },
                {
                    type: "Container",
                    padding: 6,
                    children: [
                        {
                            type: "Text",
                            fontColor: isDarkMode ? "#C5C5C5" : "#6B707B",
                            content: !values.content ? values.url || "Configure your webpage" : "HTML Content"
                        }
                    ]
                },
                {
                    type: "Container"
                }
            ]
        }
    ]
});
