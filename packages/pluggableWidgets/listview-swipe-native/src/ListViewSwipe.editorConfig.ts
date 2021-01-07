import { StructurePreviewProps, RowLayoutProps } from "@widgets-resources/piw-utils";
import { ReactNode } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";

const rowLayoutContainer = (property: ReactNode): StructurePreviewProps => ({
    type: "Container",
    borders: true,
    children: [
        {
            type: "DropZone",
            property: property as object
        }
    ]
});

export function getPreview(values: ListViewSwipeProps<any>): RowLayoutProps {
    const children: StructurePreviewProps[] = [
        {
            type: "Container",
            grow: 2,
            borders: true,
            children: [
                {
                    type: "DropZone",
                    property: values.content as object
                }
            ]
        }
    ];

    if (values.leftRenderMode !== "disabled") {
        children.unshift(rowLayoutContainer(values.left));
    }
    if (values.rightRenderMode !== "disabled") {
        children.push(rowLayoutContainer(values.right));
    }

    return {
        type: "RowLayout",
        borders: false,
        columnSize: "fixed",
        children
    };
}
