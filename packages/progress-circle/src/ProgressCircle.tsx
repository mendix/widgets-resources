import { flattenStyles, Style } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { Circle } from "react-native-progress";

import { ProgressCircleProps } from "../typings/ProgressCircleProps";

interface ProgressCircleStyle extends Style {
    container: ViewStyle;
    circle: {
        width: number;
        borderWidth: number;
        borderColor: string;
    };
    fill: {
        backgroundColor: string;
        width: number;
        lineCapRounded: boolean;
    };
    text: TextStyle;
}

const defaultProgressCircleStyle: ProgressCircleStyle = {
    container: {},
    circle: {
        width: 40,
        borderWidth: 1,
        borderColor: "rgba(0, 122, 255, 1)"
    },
    fill: {
        backgroundColor: "rgba(0, 122, 255, 1)",
        width: 3,
        lineCapRounded: false
    },
    text: {}
};

export class ProgressCircle extends Component<ProgressCircleProps<ProgressCircleStyle>> {
    private readonly formatTextHandler = this.formatText.bind(this);
    private readonly styles = flattenStyles(defaultProgressCircleStyle, this.props.style);

    private get progress(): number {
        const { maximumValue, value, defaultMaximumValue, defaultValue } = this.props;
        const maximum = maximumValue && maximumValue.value != null ? Number(maximumValue.value) : defaultMaximumValue;
        const current = value && value.value != null ? Number(value.value) : defaultValue;

        return current / maximum;
    }

    render(): JSX.Element {
        return (
            <Circle
                progress={this.progress}
                textStyle={this.styles.text as string} // remove this after PR be accepted (https://github.com/oblador/react-native-progress/pull/148)
                color={this.styles.fill.backgroundColor}
                size={Number(this.styles.circle.width)}
                borderWidth={this.styles.circle.borderWidth}
                borderColor={this.styles.circle.borderColor}
                thickness={this.styles.fill.width}
                showsText={this.props.showsText}
                {...(this.props.customText && this.props.customText.value
                    ? { formatText: this.formatTextHandler }
                    : {})}
                style={this.styles.container}
                strokeCap={this.styles.fill.lineCapRounded ? "round" : "square"}
            />
        );
    }

    private formatText(): string {
        return (this.props.customText && this.props.customText.value) || "";
    }
}
