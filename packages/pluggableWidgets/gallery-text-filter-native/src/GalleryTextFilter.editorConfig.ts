import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { GalleryTextFilterPreviewProps } from "../typings/GalleryTextFilterProps";

export function getPreview(values: GalleryTextFilterPreviewProps, isDark: boolean): StructurePreviewProps {
    const style: { borderColor: string; backgroundColor: string; textColor: string } = {
        dark: {
            borderColor: "#6B707B",
            backgroundColor: "#3E3E3E",
            textColor: "#DEDEDE"
        },
        light: {
            borderColor: "#6B707B",
            backgroundColor: "#FFFFFF",
            textColor: "#6B707B"
        }
    }[isDark ? "dark" : "light"];

    return {
        type: "Container",
        backgroundColor: style.backgroundColor,
        children: [
            {
                type: "Container",
                borders: true,
                padding: 8,
                borderRadius: 6,
                children: [
                    {
                        type: "Text",
                        content: values.placeholder,
                        fontColor: style.textColor
                    }
                ]
            }
        ]
    };
}
