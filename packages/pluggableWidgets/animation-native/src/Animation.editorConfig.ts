import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { AnimationProps } from "../typings/AnimationProps";

export function getPreview(values: AnimationProps<any>, isDarkMode: boolean): StructurePreviewProps {
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
        borders: true,
        children: [
            {
                type: "Container",
                borders: false,
                backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
                children: [
                    {
                        type: "Container",
                        borders: false,
                        padding: 4,
                        children: [
                            {
                                type: "Text",
                                bold: true,
                                fontColor: isDarkMode ? "#DEDEDE" : "#0A1324",
                                content
                            }
                        ]
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
