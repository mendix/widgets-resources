import { createElement, CSSProperties, ReactElement } from "react";
import classNames from "classnames";
import { HeightUnitEnum, WidthUnitEnum } from "../../typings/ImageViewerProps";

import "../ui/ImageViewer.scss";

export type ImageViewerImageProps = {
    type: "image" | "icon";
    image: string | undefined;
};
export type ImageViewerProps = {
    height: number;
    heightUnit: HeightUnitEnum;
    width: number;
    widthUnit: WidthUnitEnum;
    className?: string;
    style?: CSSProperties;
    responsive: boolean;
    getRef?: (node: HTMLDivElement) => void;
    // TODO: Implement the Events
    onClick?: () => void;
} & ImageViewerImageProps;

function getStyle(value: string | number, type: string): number | string {
    // when type is auto default browser styles applies
    if (type === "pixels") {
        return value;
    } else if (type === "percentage") {
        return value + "%";
    }

    return "";
}

export function ImageViewer(props: ImageViewerProps): ReactElement | null {
    const commonImageProps = {
        style: {
            ...props.style,
            height: getStyle(props.height, props.heightUnit),
            width: getStyle(props.width, props.widthUnit)
        }
    };
    return (
        <div
            className={classNames(
                "mx-image-viewer",
                { "mx-image-viewer-responsive": props.responsive },
                props.className,
                { hidden: !props.image }
            )}
        >
            {props.type === "image" ? (
                <img src={props.image} {...commonImageProps}></img>
            ) : (
                <span className={classNames("glyphicon", props.image)} {...commonImageProps} />
            )}
        </div>
    );
}

function Glyphicon(props: { icon: string | undefined; style?: CSSProperties }): ReactElement {
    return <span className={classNames("glyphicon", props.icon)} style={{ ...props.style }} />;
}

function Image(props: {
    image: string | undefined;
    style?: CSSProperties;
    height: number;
    heightUnit: HeightUnitEnum;
    width: number;
    widthUnit: WidthUnitEnum;
}): ReactElement {
    return (
        <img
            src={props.image}
            style={{
                ...props.style,
                height: getStyle(props.height, props.heightUnit),
                width: getStyle(props.width, props.widthUnit)
            }}
        />
    );
}
