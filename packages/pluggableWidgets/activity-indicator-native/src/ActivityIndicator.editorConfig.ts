import { RowLayoutProps } from "../../../tools/piw-utils/src/typings";
import { ActivityIndicatorPrimarySVG } from "./assets/ActivityIndicatorPrimary";

export const getPreview = (): RowLayoutProps => ({
    type: "RowLayout",
    borders: false,
    padding: 8,
    columnSize: "grow",
    children: [
        {
            type: "Image",
            document: ActivityIndicatorPrimarySVG(),
            data: "",
            width: 24,
            height: 24,
            padding: 8
        }
    ]
});
