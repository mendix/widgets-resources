import { Component, createElement } from "react";
import { ViewStyle } from "react-native";
import { Gradient } from "react-native-color";
import tinycolor from "tinycolor2";
import HSLA = tinycolor.ColorFormats.HSLA;

interface AlphaGradientProps {
    style?: ViewStyle;
    gradientSteps: number;
    color: HSLA;
}

export class AlphaGradient extends Component<AlphaGradientProps> {
    shouldComponentUpdate(nextProps: AlphaGradientProps): boolean {
        const current = this.props.color;
        const next = nextProps.color;

        return current.h !== next.h || current.s !== next.s || current.l !== next.l;
    }

    getStepColor = (i: number) => tinycolor({ ...this.props.color, a: i }).toHslString();

    render(): JSX.Element {
        const { style, gradientSteps } = this.props;
        return (
            <Gradient style={style} gradientSteps={gradientSteps} getStepColor={this.getStepColor} maximumValue={1} />
        );
    }
}
