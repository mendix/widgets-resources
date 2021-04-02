import { BadgeButtonPreviewProps } from "../typings/BadgeButtonProps";
import { StructurePreviewProps } from "@mendix/piw-utils-internal";

export function getPreview(values: BadgeButtonPreviewProps): StructurePreviewProps {
    return {
        type: "RowLayout",
        columnSize: "grow",
        children: [
            {
                type: "Container",
                children: [
                    {
                        type: "RowLayout",
                        columnSize: "grow",
                        padding: 8,
                        grow: 0,
                        children: [
                            {
                                type: "Container",
                                children: [
                                    {
                                        type: "Text",
                                        content: values.label,
                                        fontColor: "#FFF",
                                        bold: true,
                                        fontSize: 8
                                    }
                                ],
                                grow: 0,
                                padding: 4
                            },
                            {
                                type: "Container",
                                children: [
                                    {
                                        type: "Container",
                                        children: [
                                            {
                                                type: "Text",
                                                content: values.value,
                                                fontColor: "#264AE5",
                                                bold: true,
                                                fontSize: 8
                                            }
                                        ],
                                        padding: values.value ? 4 : 8
                                    }
                                ],
                                backgroundColor: "#FFF",
                                borderRadius: 16
                            }
                        ]
                    }
                ],
                backgroundColor: "#264AE5",
                borderRadius: 4
            },
            {
                type: "Container"
            }
        ]
    };
}
