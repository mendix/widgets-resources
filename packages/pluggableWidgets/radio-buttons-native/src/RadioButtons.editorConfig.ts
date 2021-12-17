import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { RadioButtonsPreviewProps } from "../typings/RadioButtonsProps";
import StructurePreviewSwitchSVG from "./assets/checked.svg";

export function getPreview(values: RadioButtonsPreviewProps, isDark: boolean): StructurePreviewProps {
    const label: StructurePreviewProps = {
        type: "Container",
        borders: false,
        children: [
            { type: "Container", padding: 2 },
            {
                type: "Text",
                content: values.enum,
                grow: 1
            },
            { type: "Container", padding: 2 }
        ]
    };
    const image: StructurePreviewProps = {
        type: "Image",
        document: decodeURIComponent(
            isDark
                ? StructurePreviewSwitchSVG.replace("data:image/svg+xml,", "")
                : StructurePreviewSwitchSVG.replace("data:image/svg+xml,", "")
        ),
        width: 80,
        height: 30,
        grow: 8
    };
    const children = [label, image];

    return values.orientation === "horizontal"
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
