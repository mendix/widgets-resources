import { parseStyle } from "@mendix/piw-utils-internal";
import { WebIcon } from "mendix";
import { createElement, ReactElement } from "react";
import { ImagePreviewProps } from "../typings/ImageProps";
import { Image as ImageComponent } from "./components/Image/Image";

import ImagePlaceholder from "./assets/placeholder.svg";

declare function require(name: string): string;

export function preview(props: ImagePreviewProps): ReactElement | null {
    let image = ImagePlaceholder;
    switch (props.datasource) {
        case "image":
            if (props.imageObject?.type === "static") {
                image = props.imageObject.imageUrl;
            } else if (props.defaultImageDynamic?.type === "static") {
                image = props.defaultImageDynamic.imageUrl;
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
            const isTextTemplateObject = props.imageUrl.includes("{") && props.imageUrl.includes("}");
            if (!isTextTemplateObject) {
                image = props.imageUrl;
            }
            break;
    }

    return (
        <ImageComponent
            class={props.className}
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
            renderAsBackground={props.datasource !== "icon" && props.isBackgroundImage}
            backgroundImageContent={
                <props.children.renderer caption="Place content here">
                    <div />
                </props.children.renderer>
            }
            previewMode
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/Image.scss");
}
