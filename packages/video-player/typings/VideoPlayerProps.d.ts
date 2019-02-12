/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * File generated based on VideoPlayer.xml
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface VideoPlayerProps extends CommonProps {
    videoUrl?: PluginWidget.EditableValue<string>;
    staticVideoUrl?: string;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    loadingBackgroundColor: string;
    loadingForegroundColor: string;
}
