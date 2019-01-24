import React, { Component } from "react";
import { Circle } from "react-native-progress";
import { ProgressCircleProps } from "../typings/ProgressCircleProps";

export class ProgressCircle extends Component<ProgressCircleProps> {
    private readonly formatTextHandler = this.formatText.bind(this);

    private get progress(): number {
        const { maximumValue, value, defaultMaximumValue, defaultValue } = this.props;
        const maximum = maximumValue && maximumValue.value != null ? Number(maximumValue.value) : defaultMaximumValue;
        const current = value && value.value != null ? Number(value.value) : defaultValue;

        if (this.props.indeterminate || maximum === 0) {
            return 0;
        }

        return current / maximum;
    }

    render(): JSX.Element {
        return (
            <Circle
                progress={this.progress}
                indeterminate={this.props.indeterminate}
                {...(this.props.color ? { color: this.props.color } : {})}
                {...(this.props.unfilledColor ? { color: this.props.unfilledColor } : {})}
                {...(this.props.borderColor ? { color: this.props.borderColor } : {})}
                borderWidth={this.props.borderWidth}
                size={this.props.size}
                thickness={this.props.thickness}
                showsText={this.props.showsText}
                {...(this.props.customText && this.props.customText.value
                    ? { formatText: this.formatTextHandler }
                    : {})}
            />
        );
    }

    private formatText(): string {
        return (this.props.customText && this.props.customText.value) || "";
    }
}
