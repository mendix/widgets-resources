import { createElement, CSSProperties, HTMLAttributes, ReactElement, ReactEventHandler, ReactNode } from "react";
import classNames from "classnames";
import { HeightUnitEnum, WidthUnitEnum } from "../../../typings/ImageProps";
import { LightboxProps } from "../Lightbox";

import "../../ui/Image.scss";

function getStyle(value: string | number, type: WidthUnitEnum | HeightUnitEnum): number | string {
    // when type is auto default browser styles applies
    if (type === "pixels") {
        return value;
    } else if (type === "percentage") {
        return value + "%";
    }

    return "";
}
export interface ImageWrapperProps {
    className?: string;
    responsive: boolean;
    hasImage: boolean;
    children:
        | ReactElement<ImageContentGlyphicon | ImageContentImage>
        | [ReactElement<ImageContentGlyphicon | ImageContentImage>, ReactElement<LightboxProps> | false];
}

export interface ImageContentProps {
    style?: CSSProperties;
    onClick?: ReactEventHandler<HTMLElement>;
    altText?: string;
}

function Wrapper(props: ImageWrapperProps): ReactElement {
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

export interface ImageContentGlyphicon extends ImageContentProps {
    icon: string | undefined;
    size: number;
}

function ContentGlyphicon(props: ImageContentGlyphicon): ReactElement {
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
            {...accessibilityProps}
            {...onClickProps}
        />
    );
}

export interface ImageContentImage extends ImageContentProps {
    image: string | undefined;
    height: number;
    heightUnit: HeightUnitEnum;
    width: number;
    widthUnit: WidthUnitEnum;
    className: string;
}

function ContentImage(props: ImageContentImage): ReactElement {
    const onClickProps = getImageContentOnClickProps(props.onClick);
    return (
        <img
            className={props.className}
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

function getImageContentOnClickProps(onClick: ImageContentProps["onClick"]): HTMLAttributes<HTMLElement> {
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

interface BackgroundImageProps extends ImageContentImage {
    className?: string;
    children: ReactNode;
}

function BackgroundImage(props: BackgroundImageProps): ReactElement {
    return (
        <div
            className={classNames("mx-image-viewer", "mx-image-background", props.className)}
            onClick={props.onClick}
            style={{
                ...props.style,
                height: getStyle(props.height, props.heightUnit),
                width: getStyle(props.width, props.widthUnit),
                backgroundImage: `url('${props.image}')`
            }}
        >
            {props.children}
        </div>
    );
}

export const ImageUi = {
    Wrapper,
    BackgroundImage,
    ContentGlyphicon,
    ContentImage
};
