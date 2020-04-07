/**
 * This file was generated from VideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue } from "mendix";

export interface VideoPlayerProps<Style> {
    name: string;
    style: Style[];
    videoUrl: DynamicValue<string>;
    autoStart: boolean;
    muted: boolean;
    loop: boolean;
    aspectRatio: boolean;
    showControls: boolean;
}

export interface VideoPlayerPreviewProps {
    class: string;
    style: string;
    videoUrl: string;
    autoStart: boolean;
    muted: boolean;
    loop: boolean;
    aspectRatio: boolean;
    showControls: boolean;
}
