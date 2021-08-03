import { createElement, ReactElement, useCallback } from "react";
import { GalleryPreviewProps } from "../typings/GalleryProps";
import { Gallery as GalleryComponent } from "./components/Gallery";

interface PreviewProps extends Omit<GalleryPreviewProps, "class"> {
    className: string;
}

export function preview(props: PreviewProps): ReactElement {
    const items = Array.from({ length: props.pageSize ?? 5 }).map(() => ({}));
    const caption =
        props.filterList.length > 0
            ? props.sortList.length > 0
                ? "Place filter/sort widget(s) here"
                : "Place filter widget(s) here"
            : props.sortList.length > 0
            ? "Place sort widget(s) here"
            : "Place widget(s) here";
    const isSortableFilterable = props.filterList.length > 0 || props.sortList.length > 0;
    return (
        <GalleryComponent
            className={props.className}
            desktopItems={props.desktopItems!}
            filters={
                isSortableFilterable ? (
                    <props.filtersPlaceholder.renderer caption={caption}>
                        <div />
                    </props.filtersPlaceholder.renderer>
                ) : null
            }
            items={items}
            itemRenderer={useCallback(
                renderWrapper => (
                    <props.content.renderer>{renderWrapper(null, "")}</props.content.renderer>
                ),
                [props.content]
            )}
            phoneItems={props.phoneItems!}
            tabletItems={props.tabletItems!}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/gallery-main.scss");
}
