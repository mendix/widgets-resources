import * as React from "react";
import { HeightUnitType, SizeContainer, WidthUnitType } from "./SizeContainer";

export interface PlayerErrorProps {
    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height: number;
}

export const PlayerError: React.FunctionComponent<PlayerErrorProps> = (props) => (
    <SizeContainer
        className=""
        widthUnit={props.widthUnit}
        width={props.width}
        heightUnit={props.heightUnit}
        height={props.height}>
        <div className="video-player-error">

        </div>
    </SizeContainer>
);
