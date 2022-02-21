import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { VideoPlayerPreviewProps } from "../typings/VideoPlayerProps";
import StructurePreviewWithControlsSVG from "./assets/structure-preview-video-with-controls.svg";
import StructurePreviewWithoutControlsSVG from "./assets/structure-preview-video-without-controls.svg";

export function getPreview(values: VideoPlayerPreviewProps): StructurePreviewProps {
    const image = values.showControls ? StructurePreviewWithControlsSVG : StructurePreviewWithoutControlsSVG;
    return {
        type: "Image",
        document: decodeURIComponent(image.replace("data:image/svg+xml,", "")),
        width: 375,
        height: 211
    };
}
