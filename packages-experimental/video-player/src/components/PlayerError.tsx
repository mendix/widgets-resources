import * as React from "react";

export const PlayerError: React.FunctionComponent<{preview?: boolean}> = props =>
    (
        <video poster={props.preview ? "https://i.imgur.com/Be8TLvE.png" : "https://i.imgur.com/V5pqyp2.png"} height="100%" width="100%" controls={true} style={
            {
                backgroundColor: "#000"
            }
        }>
        </video>
    );
