import { DropZoneProps, RowLayoutProps, StructurePreviewProps, TextProps } from "@mendix/piw-utils-internal/dist";
import { FieldsetPreviewProps } from "../typings/FieldsetProps";

export function getPreview(values: FieldsetPreviewProps): StructurePreviewProps | null {
    return {
        type: "Container",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                padding: 10,
                children: [
                    {
                        type: "Text",
                        content: values.legend || "Legend",
                        fontSize: 14,
                        bold: true
                    } as TextProps
                ]
            },
            {
                type: "RowLayout",
                backgroundColor: values.content.widgetCount > 0 ? undefined : "#F8F8F8",
                children: [
                    {
                        type: "DropZone",
                        property: values.content,
                        placeholder: "Place fieldset content here"
                    } as DropZoneProps
                ]
            } as RowLayoutProps
        ]
    };
}
