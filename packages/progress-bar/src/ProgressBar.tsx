import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { Bar } from "react-native-progress";
import { ProgressBarProps } from "../typings/ProgressBarProps";
import { defaultProgressBarStyle, ProgressBarStyle } from "./ui/Styles";

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
