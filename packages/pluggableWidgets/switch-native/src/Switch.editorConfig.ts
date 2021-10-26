import { hidePropertiesIn, Problem, Properties, StructurePreviewProps } from "@mendix/piw-utils-internal";
import { SwitchPreviewProps } from "../typings/SwitchProps";
import StructurePreviewSwitchSVG from "./assets/checked.svg";

export function getPreview(values: SwitchPreviewProps): StructurePreviewProps {
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
        document: decodeURIComponent(StructurePreviewSwitchSVG.replace("data:image/svg+xml,", "")),
        width: 80,
        height: 30,
        grow: 8
    };

    return values.labelOrientation === "horizontal"
        ? {
              type: "RowLayout",
              borders: false,
              padding: 4,
              columnSize: "fixed",
              children: [label, image]
          }
        : {
              type: "Container",
              borders: false,
              padding: 4,
              children: [label, image]
          };
}

export function check(values: SwitchPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (values.labelWidth! < 0 || values.labelWidth! > 11) {
        errors.push({
            property: "labelWidth",
            message: `The Label width property value cannot be less than 0 or more than 11.`
        });
    }

    return errors;
}

export function getProperties(values: SwitchPreviewProps, defaultProperties: Properties): Properties {
    if (!values.showLabel) {
        hidePropertiesIn(defaultProperties, values, ["label", "labelWidth", "labelOrientation"]);
    }

    return defaultProperties;
}
