import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { BadgePreviewProps } from "../typings/BadgeProps";

export function getPreview(values: BadgePreviewProps): StructurePreviewProps {
    return {
        type: "RowLayout",
        columnSize: "grow",
        children: [
            {
                type: "Container",
                children: [
                    {
                        type: "Container",
                        children: [
                            {
                                type: "Text",
                                content: values.value,
                                fontColor: "#FFF",
                                bold: true,
                                fontSize: 8
                            }
                        ],
                        padding: values.value ? 8 : 18
                    }
                ],
                backgroundColor: "#264AE5",
                borderRadius: values.type === "badge" ? 22 : 8
            },
            { type: "Container", grow: 2 }
        ]
    };
}
