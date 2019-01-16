import React, { Component } from "react";
import { Circle } from "react-native-progress";

interface Props {
    indeterminate: boolean;
    progressValue?: PluginWidget.EditableValue<number>;
    progressMax?: PluginWidget.EditableValue<number>;
    animated: boolean;
    size: number;
    thickness: number;
    showsText: boolean;
    color?: string;
    unfilledColor?: string;
    borderWidth: number;
    borderColor?: string;
}

export class ProgressCircle extends Component<Props> {
    private get progress(): number {
        const max = (this.props.progressMax && this.props.progressMax.value) || 100;
        const value = (this.props.progressValue && this.props.progressValue.value) || 0;

        if (this.props.indeterminate || max === 0) {
            return 0;
        }

        return value / max;
    }

    render(): JSX.Element {
        return (
            <Circle
                progress={this.progress}
                indeterminate={this.props.indeterminate}
                animated={this.props.animated}
                size={this.props.size}
                thickness={this.props.thickness}
                showsText={this.props.showsText}
                {...(this.props.color ? { color: this.props.color } : {})}
                {...(this.props.unfilledColor ? { color: this.props.unfilledColor } : {})}
                borderWidth={this.props.borderWidth}
                {...(this.props.borderColor ? { color: this.props.borderColor } : {})}
            />
        );
    }
}
