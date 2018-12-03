import * as React from "react";

export const PlayerError: React.FunctionComponent<{}> = () =>
    (
        <video poster="https://i.imgur.com/Be8TLvE.png" height="100%" width="100%" controls={true} style={
            {
                backgroundColor: "#000"
            }
        }>
        </video>
    );
