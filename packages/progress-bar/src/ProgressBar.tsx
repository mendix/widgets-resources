import { ValueStatus } from "@mendix/pluggable-widgets-api/properties";
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
        const validationMessages = this.validate();
        const progress = validationMessages.length === 0 ? this.calculateProgress() : 0;

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
                {validationMessages.length > 0 && (
                    <Text style={this.styles.validationMessage}>{validationMessages.join(" ")}</Text>
                )}
            </View>
        );
    }

    private validate(): string[] {
        const messages: string[] = [];
        const { minimumValue, maximumValue, progressValue } = this.props;

        if (minimumValue.status === ValueStatus.Unavailable) {
            messages.push("No minimum value provided.");
        }
        if (maximumValue.status === ValueStatus.Unavailable) {
            messages.push("No maximum value provided.");
        }
        if (progressValue.status === ValueStatus.Unavailable) {
            messages.push("No current value provided.");
        }
        if (
            minimumValue.status === ValueStatus.Available &&
            maximumValue.status === ValueStatus.Available &&
            minimumValue.value.gte(maximumValue.value)
        ) {
            messages.push("The minimum value can not be greater than or equal to the maximum value.");
        }
        if (
            progressValue.status === ValueStatus.Available &&
            minimumValue.status === ValueStatus.Available &&
            progressValue.value.lt(minimumValue.value)
        ) {
            messages.push("The current value can not be less than the minimum value.");
        }
        if (
            progressValue.status === ValueStatus.Available &&
            maximumValue.status === ValueStatus.Available &&
            progressValue.value.gt(maximumValue.value)
        ) {
            messages.push("The current value can not be greater than the maximum value.");
        }

        return messages;
    }

    private calculateProgress(): number {
        const { minimumValue, maximumValue, progressValue } = this.props;

        if (
            minimumValue.status !== ValueStatus.Available ||
            maximumValue.status !== ValueStatus.Available ||
            progressValue.status !== ValueStatus.Available
        ) {
            return 0;
        }

        const numerator = progressValue.value.minus(minimumValue.value);
        const denominator = maximumValue.value.minus(minimumValue.value);
        return Number(numerator.div(denominator));
    }
}
