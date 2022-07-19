import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { hidePropertiesIn, Properties } from "@mendix/pluggable-widgets-tools";

import { SwitchPreviewProps } from "../typings/SwitchProps";
import StructurePreviewSwitchSVG from "./assets/checked.svg";
import StructurePreviewSwitchDarkSVG from "./assets/checked-dark.svg";

export function getPreview(values: SwitchPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const label: StructurePreviewProps = {
        type: "Container",
        borders: false,
        children: [
            { type: "Container", padding: 2 },
            {
                type: "Text",
                content: values.label,
                grow: 1
            },
            { type: "Container", padding: 2 }
        ]
    };
    const image: StructurePreviewProps = {
        type: "Image",
        document: decodeURIComponent(
            (isDarkMode ? StructurePreviewSwitchDarkSVG : StructurePreviewSwitchSVG).replace("data:image/svg+xml,", "")
        ),
        width: 80,
        height: 30,
        grow: 8
    };
    const children = values.showLabel ? [label, image] : [image];

    return values.labelOrientation === "horizontal"
        ? {
              type: "RowLayout",
              borders: false,
              padding: 4,
              columnSize: "fixed",
              children
          }
        : {
              type: "Container",
              borders: false,
              padding: 4,
              children
          };
}

export function getProperties(values: SwitchPreviewProps, defaultProperties: Properties): Properties {
    if (!values.showLabel) {
        hidePropertiesIn(defaultProperties, values, ["label", "labelOrientation"]);
    }

    return defaultProperties;
}
