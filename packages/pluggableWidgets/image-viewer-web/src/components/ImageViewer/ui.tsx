import { createElement, CSSProperties, HTMLAttributes, ReactElement, ReactEventHandler } from "react";
import classNames from "classnames";
import { HeightUnitEnum, WidthUnitEnum } from "../../../typings/ImageViewerProps";
import { LightboxProps } from "../Lightbox";

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
        | [ReactElement<ImageViewerGlyphicon | ImageViewerImage>, ReactElement<LightboxProps> | false];
}

export interface ImageViewerContentProps {
    style?: CSSProperties;
    onClick?: ReactEventHandler<HTMLElement>;
    altText?: string;
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

export interface ImageViewerGlyphicon extends ImageViewerContentProps {
    icon: string | undefined;
    size: number;
}

function Glyphicon(props: ImageViewerGlyphicon): ReactElement {
    const accessibilityProps = props.altText
        ? {
              "aria-label": props.altText,
              role: "img"
          }
        : {};

    const onClickProps = getImageContentOnClickProps(props.onClick);

    return (
        <span
            className={classNames("glyphicon", props.icon)}
            style={{ ...props.style, fontSize: `${props.size}px` }}
            {...onClickProps}
            {...accessibilityProps}
        />
    );
}

export interface ImageViewerImage extends ImageViewerContentProps {
    image: string | undefined;
    height: number;
    heightUnit: HeightUnitEnum;
    width: number;
    widthUnit: WidthUnitEnum;
}

function Image(props: ImageViewerImage): ReactElement {
    const onClickProps = getImageContentOnClickProps(props.onClick);
    return (
        <img
            src={props.image}
            style={{
                ...props.style,
                height: getStyle(props.height, props.heightUnit),
                width: getStyle(props.width, props.widthUnit)
            }}
            alt={props.altText}
            {...onClickProps}
        />
    );
}

function getImageContentOnClickProps(onClick: ImageViewerContentProps["onClick"]): HTMLAttributes<HTMLElement> {
    if (!onClick) {
        return {};
    }
    return {
        onClick,
        role: "button",
        tabIndex: 0,
        onKeyDown: event => {
            if (event.key === "Enter" || event.key === " ") {
                onClick(event);
            }
        }
    };
}

export const ImageViewerUi = {
    Wrapper,
    Glyphicon,
    Image
};
