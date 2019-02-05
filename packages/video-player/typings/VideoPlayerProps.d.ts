/**
 * Auto-generated from VideoPlayer.xml
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
