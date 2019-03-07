import { Component, createElement } from "react";
import { ViewStyle } from "react-native";
import { Bar } from "react-native-progress";
import { ProgressBarProps } from "../typings/ProgressBarProps";
import { flattenStyles, Style } from "./utils/common";

interface ProgressBarStyle extends Style {
    bar: ViewStyle;
    fill: {
        backgroundColor: string;
    };
}

const defaultProgressBarStyle: ProgressBarStyle = {
    bar: {
        borderWidth: 1,
        borderColor: "rgba(0,122,255,1)",
        borderRadius: 4,
        height: 6
    },
    fill: {
        backgroundColor: "rgba(0,122,255,1)"
    }
};

export class ProgressBar extends Component<ProgressBarProps<ProgressBarStyle>> {
    private readonly styles = flattenStyles(defaultProgressBarStyle, this.props.style);
    private get progress(): number {
        const { maximumValue, value, defaultMaximumValue, defaultValue } = this.props;
        const maximum = maximumValue && maximumValue.value != null ? Number(maximumValue.value) : defaultMaximumValue;
        const current = value && value.value != null ? Number(value.value) : defaultValue;

        return current / maximum;
    }

    render(): JSX.Element {
        return (
            <Bar
                height={Number(this.styles.bar.height)}
                width={
                    !this.styles.bar.width || typeof this.styles.bar.width === "string"
                        ? (null as any)
                        : this.styles.bar.width
                }
                progress={this.progress}
                color={this.styles.fill.backgroundColor}
                borderWidth={this.styles.bar.borderWidth}
                style={this.styles.bar}
            />
        );
    }
}
