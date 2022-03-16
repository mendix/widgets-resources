import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import vewViewGlobeDark from "./assets/WebviewGlobe.dark.svg";
import vewViewGlobeLight from "./assets/WebviewGlobe.light.svg";

import { WebViewPreviewProps } from "../typings/WebViewProps";

export const getPreview = (values: WebViewPreviewProps, isDarkMode: boolean): StructurePreviewProps => ({
    type: "Container",
    borders: true,
    backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
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
                            content:
                                values.content === ""
                                    ? values.url === ""
                                        ? "Configure your webpage"
                                        : values.url
                                    : "HTML Content"
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
