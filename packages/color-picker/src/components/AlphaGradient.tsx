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
    shouldComponentUpdate(nextProps: AlphaGradientProps, _nextState: any): boolean {
        if (this.props.color.h !== nextProps.color.h) {
            return true;
        }
        if (this.props.color.s !== nextProps.color.s) {
            return true;
        }
        if (this.props.color.l !== nextProps.color.l) {
            return true;
        }
        return false;
    }

    getStepColor = (i: number) => tinycolor({ ...this.props.color, a: i }).toHslString();

    render(): JSX.Element {
        const { style, gradientSteps } = this.props;
        return (
            <Gradient style={style} gradientSteps={gradientSteps} getStepColor={this.getStepColor} maximumValue={1} />
        );
    }
}
