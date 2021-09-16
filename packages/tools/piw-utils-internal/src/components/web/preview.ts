import { WebIcon } from "mendix";

export function mapPreviewIconToWebIcon(
    icon?: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null
): WebIcon {
    if (icon) {
        if (icon.type === "glyph") {
            return {
                type: "glyph",
                iconClass: icon.iconClass
            };
        }
        return {
            type: "image",
            iconUrl: icon.imageUrl
        };
    }
    return undefined;
}
