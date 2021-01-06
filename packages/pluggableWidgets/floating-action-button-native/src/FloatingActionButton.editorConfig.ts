import { ImageProps, ContainerProps } from "@widgets-resources/piw-utils";
import { FloatingActionButtonPreviewProps } from "../typings/FloatingActionButtonProps";
import { FABPrimarySVG } from "./assets/FloatingActionButton_Primary";

const rowLayoutContainer: ContainerProps = { type: "Container", children: [] };
const rowLayoutImage: ImageProps = {
    type: "image",
    document: FABPrimarySVG(),
    data: "",
    width: 56,
    height: 56
};

export const getPreview = (values: FloatingActionButtonPreviewProps) => ({
    type: "RowLayout",
    borders: false,
    padding: 8,
    columnSize: "grow",
    children: (() => {
        switch (values.horizontalPosition) {
            case "left":
                return [rowLayoutImage];
            case "center":
                return [rowLayoutContainer, rowLayoutImage, rowLayoutContainer];
            case "right":
                return [rowLayoutContainer, rowLayoutImage];
        }
    })()
});
