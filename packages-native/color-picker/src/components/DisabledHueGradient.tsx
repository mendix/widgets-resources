import { Component, createElement } from "react";
import { Gradient } from "react-native-color";
import tinycolor from "tinycolor2";
import HSLA = tinycolor.ColorFormats.HSLA;

interface DisabledHueGradientProps {
    color: HSLA;
}

export class DisabledHueGradient extends Component<DisabledHueGradientProps> {
    getStepColor = (_: number) => tinycolor(this.props.color).toHslString();

    render(): JSX.Element {
        return <Gradient gradientSteps={1} getStepColor={this.getStepColor} maximumValue={1} />;
    }
}
