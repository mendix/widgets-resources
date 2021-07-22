import { createElement, ReactElement, useCallback } from "react";
import { GalleryContainerProps } from "../typings/GalleryProps";
import { Gallery as GalleryComponent } from "./components/Gallery";
import "./ui/gallery-main.scss";

export function Gallery(props: GalleryContainerProps): ReactElement {
    return (
        <GalleryComponent
            className={props.class}
            desktopItems={props.desktopItems}
            items={props.datasource.items ?? []}
            itemRenderer={useCallback(
                (renderWrapper, item) =>
                    renderWrapper(
                        props.content.get(item),
                        props.itemClass?.get(item)?.value,
                        props.onClick ? props.onClick?.get(item).execute : undefined
                    ),
                [props.content, props.itemClass, props.onClick]
            )}
            phoneItems={props.phoneItems}
            tabletItems={props.tabletItems}
        />
    );
}
