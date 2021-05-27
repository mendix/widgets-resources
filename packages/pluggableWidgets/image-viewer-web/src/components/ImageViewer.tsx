import { createElement, CSSProperties, ReactElement, useCallback, useState } from "react";
import classNames from "classnames";
import Lightbox from "react-image-lightbox";
import { HeightUnitEnum, WidthUnitEnum } from "../../typings/ImageViewerProps";

import "../ui/ImageViewer.scss";
export interface ImageViewerProps {
    imageUrl: string | undefined;
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
}

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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleLightBox = useCallback((): void => setIsOpen(currentIsOpen => !currentIsOpen), []);

    return (
        <div
            className={classNames(
                "mx-image-viewer",
                { "mx-image-viewer-responsive": props.responsive },
                props.className,
                { hidden: !props.imageUrl }
            )}
            style={props.style}
        >
            <img
                onClick={toggleLightBox}
                src={props.imageUrl}
                style={{
                    ...props.style,
                    height: getStyle(props.height, props.heightUnit),
                    width: getStyle(props.width, props.widthUnit)
                }}
            ></img>
            {isOpen && props.imageUrl ? <Lightbox mainSrc={props.imageUrl} onCloseRequest={toggleLightBox} /> : null}
        </div>
    );
}
