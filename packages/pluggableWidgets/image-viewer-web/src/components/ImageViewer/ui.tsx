import { createElement, CSSProperties, ReactElement } from "react";
import classNames from "classnames";
import ReactModal from "react-modal";
import { HeightUnitEnum, WidthUnitEnum } from "../../../typings/ImageViewerProps";

import "../../ui/ImageViewer.scss";

function getStyle(value: string | number, type: WidthUnitEnum | HeightUnitEnum): number | string {
    // when type is auto default browser styles applies
    if (type === "pixels") {
        return value;
    } else if (type === "percentage") {
        return value + "%";
    }

    return "";
}
export interface ImageViewerWrapperProps {
    className?: string;
    responsive: boolean;
    hasImage: boolean;
    children:
        | ReactElement<ImageViewerGlyphicon | ImageViewerImage>
        | [ReactElement<ImageViewerGlyphicon | ImageViewerImage>, ReactElement<ReactModal> | false];
}

interface ImageViewerContent {
    style?: CSSProperties;
    onClick?: () => void;
}

function Wrapper(props: ImageViewerWrapperProps): ReactElement {
    return (
        <div
            className={classNames(
                "mx-image-viewer",
                { "mx-image-viewer-responsive": props.responsive },
                props.className,
                { hidden: !props.hasImage }
            )}
        >
            {props.children}
        </div>
    );
}

export interface ImageViewerGlyphicon extends ImageViewerContent {
    icon: string | undefined;
    size: number;
}

function Glyphicon(props: ImageViewerGlyphicon): ReactElement {
    return (
        <span
            className={classNames("glyphicon", props.icon)}
            style={{ ...props.style, fontSize: `${props.size}px` }}
            onClick={props.onClick}
        />
    );
}

export interface ImageViewerImage extends ImageViewerContent {
    image: string | undefined;
    height: number;
    heightUnit: HeightUnitEnum;
    width: number;
    widthUnit: WidthUnitEnum;
}

function Image(props: ImageViewerImage): ReactElement {
    return (
        <img
            src={props.image}
            style={{
                ...props.style,
                height: getStyle(props.height, props.heightUnit),
                width: getStyle(props.width, props.widthUnit)
            }}
            onClick={props.onClick}
        />
    );
}

export const ImageViewerUi = {
    Wrapper,
    Glyphicon,
    Image
};
