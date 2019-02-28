/**
 * This file was generated from VideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface VideoPlayerProps extends CommonProps {
    videoUrl?: EditableValue<string>;
    staticVideoUrl?: string;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    loadingBackgroundColor: string;
    loadingForegroundColor: string;
}
