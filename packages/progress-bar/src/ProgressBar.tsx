import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { View } from "react-native";
import { Bar } from "react-native-progress";

import { ProgressBarProps } from "../typings/ProgressBarProps";
import { defaultProgressBarStyle, ProgressBarStyle } from "./ui/Styles";

export type Props = ProgressBarProps<ProgressBarStyle>;

export class ProgressBar extends Component<Props> {
    private readonly styles = flattenStyles(defaultProgressBarStyle, this.props.style);

    private get progress(): number {
        if (!this.props.progressValue.value || !this.props.minimumValue.value || !this.props.maximumValue.value) {
            return 0;
        }

        const denominator = this.props.maximumValue.value.minus(this.props.minimumValue.value);
        if (denominator.eq(0)) {
            return 0;
        }

        return Number(this.props.progressValue.value.minus(this.props.minimumValue.value).div(denominator));
    }

    render(): JSX.Element {
        return (
            <View style={this.styles.container}>
                <Bar
                    height={Number(this.styles.bar.height)}
                    width={null}
                    progress={this.progress}
                    color={this.styles.fill.backgroundColor}
                    borderWidth={this.styles.bar.borderWidth}
                    style={this.styles.bar}
                />
            </View>
        );
    }
}
