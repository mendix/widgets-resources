import { FunctionComponent, createElement } from "react";

interface PlayerErrorProps {
    preview?: boolean;
}

export const Error: FunctionComponent<PlayerErrorProps> = (props: PlayerErrorProps): JSX.Element => (
    <div className="widget-video-player-error-container">
        <div className="video-error-label">
            {props.preview
                ? "The actual video rendering will be based on the attribute content."
                : "The video failed to load :("}
        </div>
        <video height="100%" width="100%" controls />
    </div>
);
