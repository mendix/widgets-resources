import { RowLayoutProps } from "@mendix/piw-utils-internal";
import StructurePreviewActivityIndicatorPrimarySVG from "./assets/StructurePreviewActivityIndicatorPrimary.svg";

export const getPreview = (): RowLayoutProps => ({
    type: "RowLayout",
    borders: false,
    padding: 8,
    columnSize: "grow",
    children: [
        {
            type: "Image",
            document: decodeURIComponent(
                StructurePreviewActivityIndicatorPrimarySVG.replace("data:image/svg+xml,", "")
            ),
            width: 24,
            height: 24,
            padding: 8
        }
    ]
});
