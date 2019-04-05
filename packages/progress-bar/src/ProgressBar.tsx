import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { View } from "react-native";
import { Bar } from "react-native-progress";

import { ProgressBarProps } from "../typings/ProgressBarProps";
import { defaultProgressBarStyle, ProgressBarStyle } from "./ui/Styles";

export class ProgressBar extends Component<ProgressBarProps<ProgressBarStyle>> {
    private readonly styles = flattenStyles(defaultProgressBarStyle, this.props.style);

    private get progress(): number {
        const maximum = getNumberValue(this.props.maximumValueAttribute, this.props.maximumValueDefault);
        const current = getNumberValue(this.props.valueAttribute, this.props.valueDefault);

        return current / maximum;
    }

    render(): JSX.Element {
        const width = this.styles.bar.width && typeof this.styles.bar.width !== "string" ? this.styles.bar.width : null;

        return (
            <View style={this.styles.container}>
                <Bar
                    height={Number(this.styles.bar.height)}
                    width={width}
                    progress={this.progress}
                    color={this.styles.fill.backgroundColor}
                    borderWidth={this.styles.bar.borderWidth}
                    style={this.styles.bar}
                />
            </View>
        );
    }
}

function getNumberValue(attribute: EditableValue<BigJs.Big> | undefined, staticDefault: number): number {
    return attribute && attribute.value != null ? Number(attribute.value) : staticDefault;
}
