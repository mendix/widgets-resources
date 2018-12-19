import * as React from "react";

export const PlayerError: React.FunctionComponent<{preview?: boolean}> = props =>
    (
        <div style={{ width: "100%", height: "100%" }}>
            <div className="video-error-label">{props.preview ? "The actual video rendering will be based on the attribute content." : "We are unable to show the video content :("}</div>
            <video height="100%" width="100%" controls={true} style={
                {
                    backgroundColor: "#000"
                }
            }>
            </video>
        </div>
    );
