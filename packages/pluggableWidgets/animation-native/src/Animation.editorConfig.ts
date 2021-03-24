import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { AnimationProps } from "../typings/AnimationProps";

export function getPreview(values: AnimationProps<any>): StructurePreviewProps {
    const prettifyText = (text: string) => text.replace(/([A-Z])/g, " $1").toLowerCase();
    const animationType =
        values.animationType === "in" ? "Entrance" : values.animationType === "attention" ? "Attention" : "Exit";
    const animation =
        values.animationType === "in"
            ? `${prettifyText(values.animationIn)}`
            : values.animationType === "attention"
            ? `${prettifyText(values.animationAttention)}`
            : `${prettifyText(values.animationOut)}`;

    const content =
        `${animationType} ${animation} ${values.duration}ms` + (values.delay ? `, delay ${values.delay}ms` : "");

    return {
        type: "Container",
        borders: false,
        children: [
            {
                type: "Container",
                padding: 4,
                borders: false,
                children: [
                    {
                        type: "Text",
                        bold: true,
                        content
                    }
                ]
            },
            {
                type: "DropZone",
                property: values.content as object
            }
        ]
    };
}
