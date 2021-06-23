import { parseStyle } from "@mendix/piw-utils-internal";
import { WebIcon } from "mendix";
import { createElement, ReactElement } from "react";
import { ImageViewerPreviewProps } from "../typings/ImageViewerProps";
import { ImageViewer as ImageViewerComponent } from "./components/ImageViewer/index";

import ImageViewerPlaceholder from "./assets/placeholder.svg";

declare function require(name: string): string;

export function preview(props: ImageViewerPreviewProps): ReactElement | null {
    let image = ImageViewerPlaceholder;
    switch (props.datasource) {
        case "image":
            // TODO: Remove these when preview typing for `image` property is aligned properly by PageEditor
            const imageObject:
                | { type: "static"; imageUrl: string }
                | { type: "dynamic"; entity: string }
                | null = props.imageObject as any;
            if (imageObject?.type === "static") {
                // The optional chaining in the conditional guarantees the object is set here.
                image = imageObject.imageUrl;
            }
            break;
        case "icon":
            // TODO: Remove these when preview typing for `icon` property is aligned properly by PageEditor
            const imageIcon: WebIcon | null = props.imageIcon as any;
            if (imageIcon?.type === "glyph") {
                image = imageIcon.iconClass;
            }
            if (imageIcon?.type === "image") {
                image = imageIcon.iconUrl;
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
