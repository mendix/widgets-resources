import * as React from "react";

interface CommonProps {
    "class"?: string;
    style?: React.CSSProperties;
    tabIndex: number;
    id: string;
}
export interface VideoPlayerContainerProps extends CommonProps {
    urlAttribute?: PluginWidget.EditableValue<string>;
    urlStatic?: string;
    posterAttribute?: PluginWidget.EditableValue<string>;
    posterImageUrl?: string;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: "percentage" | "pixels";
    width: number;
    aspectRatio: boolean;
    heightUnit: "percentageOfWidth" | "pixels" | "percentageOfParent";
    height: number;
}
export interface VideoPlayerWebModelerProps extends CommonProps {
    urlAttribute?: string;
    urlStatic?: string;
    posterAttribute?: string;
    posterImageUrl?: string;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: "percentage" | "pixels";
    width: number;
    aspectRatio: boolean;
    heightUnit: "percentageOfWidth" | "pixels" | "percentageOfParent";
    height: number;
}
