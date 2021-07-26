import { createElement, ReactElement, useCallback } from "react";
import { GalleryPreviewProps } from "../typings/GalleryProps";
import { Gallery as GalleryComponent } from "./components/Gallery";

interface PreviewProps extends Omit<GalleryPreviewProps, "class"> {
    className: string;
}

export function preview(props: PreviewProps): ReactElement {
    const items = Array.from({ length: props.pageSize ?? 5 }).map(() => ({}));
    return (
        <GalleryComponent
            className={props.className}
            desktopItems={props.desktopItems!}
            filters={
                <props.filters.renderer caption="Place filter widget(s) here">
                    <div>{props.filters}</div>
                </props.filters.renderer>
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
