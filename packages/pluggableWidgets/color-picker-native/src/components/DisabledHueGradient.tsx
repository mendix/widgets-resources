import { createElement, ReactElement } from "react";
import { Gradient } from "react-native-color";
import tinycolor from "tinycolor2";
import HSLA = tinycolor.ColorFormats.HSLA;

interface DisabledHueGradientProps {
    color: HSLA;
}

export const DisabledHueGradient = (props: DisabledHueGradientProps): ReactElement => (
    <Gradient gradientSteps={1} getStepColor={() => tinycolor(props.color).toHslString()} maximumValue={1} />
);
