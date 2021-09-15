import { cloneElement, createElement, CSSProperties, FunctionComponent, ReactNode, useCallback } from "react";
import { HeightUnitEnum, WidthUnitEnum, OnClickTypeEnum, DisplayAsEnum } from "../../../typings/ImageProps";
import { useLightboxState } from "../../utils/lightboxState";
import { ImageViewerUi, ImageViewerContentProps } from "./ui";
import { Lightbox, LightboxProps } from "../Lightbox";

import "../../ui/Image.scss";

export type ImageViewerImageProps = {
    type: "image" | "icon";
    image: string | undefined;
};

export interface ImageViewerProps extends ImageViewerImageProps {
    class: string;
    style?: CSSProperties;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
    iconSize: number;
    responsive: boolean;
    onClickType: OnClickTypeEnum;
    onClick?: () => void;
    altText?: string;
    displayAs: DisplayAsEnum;
    previewMode?: boolean;
    renderAsBackground: boolean;
    backgroundImageContent?: ReactNode;
}

function processImageLink(imageLink: string | undefined, displayAs: DisplayAsEnum): string | undefined {
    if (!imageLink || displayAs === "fullImage") {
        return imageLink;
    }
    const url = new URL(imageLink);
    url.searchParams.append("thumb", "true");
    return url.href;
}

export const ImageViewer: FunctionComponent<ImageViewerProps> = ({
    class: className,
    style,
    widthUnit,
    width,
    heightUnit,
    height,
    iconSize,
    responsive,
    onClickType,
    onClick,
    type,
    image,
    altText,
    displayAs,
    previewMode,
    renderAsBackground,
    backgroundImageContent
}) => {
    const { lightboxIsOpen, openLightbox, closeLightbox } = useLightboxState();

    const onCloseLightbox = useCallback<LightboxProps["onClose"]>(
        event => {
            event?.stopPropagation();
            closeLightbox();
        },
        [closeLightbox]
    );

    const onImageClick = useCallback<Exclude<ImageViewerContentProps["onClick"], undefined>>(
        event => {
            event.stopPropagation();
            if (onClickType === "action") {
                onClick?.();
            } else if (onClickType === "enlarge") {
                openLightbox();
            }
        },
        [onClick, onClickType, openLightbox]
    );

    const hasClickHandler = (onClickType === "action" && onClick) || onClickType === "enlarge";
    const sharedContentProps: ImageViewerContentProps = {
        style,
        onClick: hasClickHandler ? onImageClick : undefined,
        altText
    };

    const content =
        type === "image" ? (
            <ImageViewerUi.Image
                image={processImageLink(image, displayAs)}
                height={height}
                heightUnit={heightUnit}
                width={width}
                widthUnit={widthUnit}
                {...sharedContentProps}
            />
        ) : (
            <ImageViewerUi.Glyphicon icon={image} size={iconSize} {...sharedContentProps} />
        );

    if (renderAsBackground) {
        return (
            <ImageViewerUi.BackgroundImage
                className={className}
                style={style}
                image={image}
                height={height}
                heightUnit={heightUnit}
                width={width}
                widthUnit={widthUnit}
                onClick={event => {
                    event.stopPropagation();
                    onClick?.();
                }}
            >
                {backgroundImageContent}
            </ImageViewerUi.BackgroundImage>
        );
    }

    return (
        <ImageViewerUi.Wrapper
            className={className}
            responsive={responsive}
            hasImage={image !== undefined && image.length > 0}
        >
            {content}
            {!previewMode && lightboxIsOpen && (
                <Lightbox isOpen={lightboxIsOpen} onClose={onCloseLightbox}>
                    {type === "image" ? cloneElement(content, { image, onClick: undefined }) : content}
                </Lightbox>
            )}
        </ImageViewerUi.Wrapper>
    );
};
