import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { Text, View } from "react-native";
import { Bar } from "react-native-progress";

import { ProgressBarProps } from "../typings/ProgressBarProps";
import { defaultProgressBarStyle, ProgressBarStyle } from "./ui/Styles";

export type Props = ProgressBarProps<ProgressBarStyle>;

export class ProgressBar extends Component<Props> {
    private readonly styles = flattenStyles(defaultProgressBarStyle, this.props.style);

    render(): JSX.Element {
        const min = this.props.minimumValue.value;
        const max = this.props.maximumValue.value;
        const value = this.props.progressValue.value;

        const invalidPropsMessage = min != null && max != null && value != null ? validate(min, max, value) : undefined;

        const progress =
            min != null && max != null && value != null && invalidPropsMessage == null
                ? calculateProgress(min, max, value)
                : 0;

        return (
            <View style={this.styles.container}>
                <Bar
                    height={Number(this.styles.bar.height)}
                    width={null}
                    progress={progress}
                    color={this.styles.fill.backgroundColor}
                    borderWidth={this.styles.bar.borderWidth}
                    style={this.styles.bar}
                />
                {invalidPropsMessage && <Text style={this.styles.validationMessage}>{invalidPropsMessage}</Text>}
            </View>
        );
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
