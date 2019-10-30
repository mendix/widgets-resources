/**
 * This file was generated from VideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface VideoPlayerProps<Style> extends CommonProps<Style> {
    videoUrl: DynamicValue<string>;
    autoStart: boolean;
    muted: boolean;
    loop: boolean;
    aspectRatio: boolean;
    showControls: boolean;
}
