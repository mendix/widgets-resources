import React, { Component } from "react";
import { Platform, ProgressBarAndroid, ProgressViewIOS } from "react-native";

interface Props {
    progressValue: PluginWidget.EditableValue<number>;
    progressMin: PluginWidget.EditableValue<number>;
    progressMax: PluginWidget.EditableValue<number>;
    color?: string;
}

export class ProgressBar extends Component<Props> {
    private get progress(): number {
        const min = this.props.progressMin.value || 0;
        const max = this.props.progressMax.value || 100;
        const value = this.props.progressValue.value || 0;
        return value / (max - min);
    }

    render(): JSX.Element {
        return Platform.select({
            ios: this.renderIOS(),
            android: this.renderAndroid()
        });
    }

    private renderIOS(): JSX.Element {
        return <ProgressViewIOS progress={this.progress} progressTintColor={this.props.color} />;
    }

    private renderAndroid(): JSX.Element {
        return <ProgressBarAndroid progress={this.progress} color={this.props.color} />;
    }
}
