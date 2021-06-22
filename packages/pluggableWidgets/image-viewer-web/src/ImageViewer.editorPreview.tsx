import { parseStyle } from "@mendix/piw-utils-internal";
import { createElement, ReactElement } from "react";
import { ImageViewerPreviewProps } from "../typings/ImageViewerProps";
import { ImageViewer as ImageViewerComponent } from "./components/ImageViewer/index";

import ImageViewerPlaceholder from "./assets/placeholder.svg";

declare function require(name: string): string;

export function preview(props: ImageViewerPreviewProps): ReactElement | null {
    let image = ImageViewerPlaceholder;
    switch (props.datasource) {
        case "image":
            if (props.imageObject?.type === "static") {
                // The optional chaining in the conditional guarantees the object is set here.
                image = props.imageObject.imageUrl;
            }
            break;
        case "icon":
            if (props.imageIcon?.type === "glyph") {
                image = props.imageIcon.iconClass;
            }
            if (props.imageIcon?.type === "image") {
                image = props.imageIcon.iconUrl;
            }
            break;
        case "imageUrl":
            const isTextTemplateObject = props.imageUrl.startsWith("{") && props.imageUrl.endsWith("}");
            if (!isTextTemplateObject) {
                image = props.imageUrl;
            }
            break;
    }

    return (
        <ImageViewerComponent
            class={props.class}
            style={parseStyle(props.style)}
            widthUnit={props.widthUnit}
            width={props.width ?? 100}
            heightUnit={props.heightUnit}
            height={props.height ?? 100}
            iconSize={props.iconSize ?? 14}
            responsive={props.responsive}
            onClickType={props.onClickType}
            onClick={undefined}
            type={props.datasource === "icon" && props.imageIcon?.type === "glyph" ? "icon" : "image"}
            image={image}
            displayAs={props.displayAs}
            previewMode
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/ImageViewer.scss");
}
