import { Component, createElement } from "react";
import { Bar } from "react-native-progress";
import { ProgressBarProps } from "../typings/ProgressBarProps";

export class ProgressBar extends Component<ProgressBarProps> {
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
            <Bar
                progress={this.progress}
                indeterminate={this.props.indeterminate}
                {...(this.props.color ? { color: this.props.color } : {})}
                {...(this.props.unfilledColor ? { color: this.props.unfilledColor } : {})}
                {...(this.props.borderColor ? { color: this.props.borderColor } : {})}
                borderWidth={this.props.borderWidth}
                {...(this.props.height ? { height: this.props.height } : {})}
                {...(this.props.borderRadius != null ? { borderRadius: this.props.borderRadius } : {})}
                width={null as any}
            />
        );
    }
}
