import { available, flattenStyles, unavailable } from "@native-mobile-resources/util-widgets";
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
                    testID={this.props.name}
                    height={Number(this.styles.bar.height)}
                    width={null}
                    progress={progress}
                    color={this.styles.fill.backgroundColor}
                    borderWidth={this.styles.bar.borderWidth}
                    style={this.styles.bar}
                />
                {validationMessages.length > 0 && (
                    <Text style={this.styles.validationMessage}>{validationMessages.join("\n")}</Text>
                )}
            </View>
        );
    }

    private validate(): string[] {
        const messages: string[] = [];
        const { minimumValue, maximumValue, progressValue } = this.props;

        if (unavailable(minimumValue)) {
            messages.push("No minimum value provided.");
        }
        if (unavailable(maximumValue)) {
            messages.push("No maximum value provided.");
        }
        if (unavailable(progressValue)) {
            messages.push("No current value provided.");
        }
        if (available(minimumValue) && available(maximumValue) && available(progressValue)) {
            if (minimumValue.value!.gte(maximumValue.value!)) {
                messages.push("The minimum value must be equal or less than the maximum value.");
            } else {
                if (progressValue.value!.lt(minimumValue.value!)) {
                    messages.push("The current value must be equal or greater than the minimum value.");
                }
                if (progressValue.value!.gt(maximumValue.value!)) {
                    messages.push("The current value must be equal or less than the maximum value.");
                }
            }
        }

        return messages;
    }

    private calculateProgress(): number {
        const { minimumValue, maximumValue, progressValue } = this.props;

        if (!available(minimumValue) || !available(maximumValue) || !available(progressValue)) {
            return 0;
        }

        const numerator = progressValue.value!.minus(minimumValue.value!);
        const denominator = maximumValue.value!.minus(minimumValue.value!);
        return Number(numerator.div(denominator));
    }
}
