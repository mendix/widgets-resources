import { RowLayoutProps } from "../../../tools/piw-utils/src/typings";
import { StructurePreviewActivityIndicatorPrimarySVG } from "./assets/StructurePreviewActivityIndicatorPrimary";

export const getPreview = (): RowLayoutProps => ({
    type: "RowLayout",
    borders: false,
    padding: 8,
    columnSize: "grow",
    children: [
        {
            type: "Image",
            document: StructurePreviewActivityIndicatorPrimarySVG,
            data: "",
            width: 24,
            height: 24,
            padding: 8
        }
    ]
});
