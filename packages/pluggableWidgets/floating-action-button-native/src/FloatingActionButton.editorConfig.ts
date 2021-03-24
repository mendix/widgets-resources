import { ImageProps, ContainerProps } from "@mendix/piw-utils-internal";
import { FloatingActionButtonPreviewProps } from "../typings/FloatingActionButtonProps";
import StructurePreviewFloatingActionButtonPrimarySVG from "./assets/StructurePreviewFloatingActionButtonPrimary.svg";

const rowLayoutContainer: ContainerProps = { type: "Container", children: [] };
const rowLayoutImage: ImageProps = {
    type: "Image",
    document: decodeURIComponent(StructurePreviewFloatingActionButtonPrimarySVG.replace("data:image/svg+xml,", "")),
    width: 32,
    height: 32
};

export const getPreview = (values: FloatingActionButtonPreviewProps) => ({
    type: "RowLayout",
    borders: false,
    padding: 8,
    columnSize: "grow",
    children:
        values.horizontalPosition === "left"
            ? [rowLayoutImage]
            : values.horizontalPosition === "center"
            ? [rowLayoutContainer, rowLayoutImage, rowLayoutContainer]
            : [rowLayoutContainer, rowLayoutImage]
});
