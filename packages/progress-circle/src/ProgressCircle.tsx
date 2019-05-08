import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { Text, View } from "react-native";
import { Circle } from "react-native-progress";

import { ProgressCircleProps } from "../typings/ProgressCircleProps";
import { defaultProgressCircleStyle, ProgressCircleStyle } from "./ui/Styles";

export type Props = ProgressCircleProps<ProgressCircleStyle>;

export class ProgressCircle extends Component<Props> {
    private readonly styles = flattenStyles(defaultProgressCircleStyle, this.props.style);

    render(): JSX.Element {
        const min = this.props.minimumValue.value;
        const max = this.props.maximumValue.value;
        const value = this.props.progressValue.value;

        const invalidPropsMessage = min != null && max != null && value != null ? validate(min, max, value) : undefined;

        const progress =
            min != null && max != null && value != null && invalidPropsMessage == null
                ? calculateProgress(min, max, value)
                : 0;

        const showsText = this.props.circleText !== "none";

        return (
            <View style={this.styles.container}>
                <Circle
                    progress={progress}
                    textStyle={this.styles.text}
                    color={this.styles.fill.backgroundColor}
                    size={Number(this.styles.circle.size)}
                    borderWidth={this.styles.circle.borderWidth}
                    borderColor={this.styles.circle.borderColor}
                    thickness={this.styles.fill.width}
                    showsText={showsText}
                    {...(showsText ? { formatText: () => this.formatText(progress) } : {})}
                    strokeCap={this.styles.fill.lineCapRounded ? "round" : "square"}
                />
                {invalidPropsMessage && <Text style={this.styles.validationMessage}>{invalidPropsMessage}</Text>}
            </View>
        );
    }

    private formatText(progress: number): string {
        switch (this.props.circleText as "customText" | "percentage") {
            case "customText":
                return (this.props.customText && this.props.customText.value) || "";
            case "percentage":
                return `${Math.round(progress * 100)}%`;
        }
    }
}

function validate(minimum: BigJs.Big, maximum: BigJs.Big, value: BigJs.Big): string | undefined {
    if (minimum.gte(maximum)) {
        return "The minimum value can not be greater than or equal to the maximum value.";
    }
    if (value.lt(minimum)) {
        return "The current value can not be less than the minimum value.";
    }
    if (value.gt(maximum)) {
        return "The current value can not be greater than the maximum value.";
    }
    return;
}

function calculateProgress(minimum: BigJs.Big, maximum: BigJs.Big, value: BigJs.Big): number {
    const numerator = value.minus(minimum);
    const denominator = maximum.minus(minimum);
    return Number(numerator.div(denominator));
}
