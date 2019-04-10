import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { View } from "react-native";
import { Circle } from "react-native-progress";

import { ProgressCircleProps } from "../typings/ProgressCircleProps";
import { defaultProgressCircleStyle, ProgressCircleStyle } from "./ui/Styles";

export class ProgressCircle extends Component<ProgressCircleProps<ProgressCircleStyle>> {
    private readonly formatTextHandler = this.formatText.bind(this);
    private readonly styles = flattenStyles(defaultProgressCircleStyle, this.props.style);

    private get progress(): number {
        const maximum = getNumberValue(this.props.maximumValueAttribute, this.props.maximumValueDefault);
        const current = getNumberValue(this.props.valueAttribute, this.props.valueDefault);

        return current / maximum;
    }

    render(): JSX.Element {
        const showsText = this.props.circleText !== "none";

        return (
            <View style={this.styles.container}>
                <Circle
                    progress={this.progress}
                    textStyle={this.styles.text}
                    color={this.styles.fill.backgroundColor}
                    size={Number(this.styles.circle.size)}
                    borderWidth={this.styles.circle.borderWidth}
                    borderColor={this.styles.circle.borderColor}
                    thickness={this.styles.fill.width}
                    showsText={showsText}
                    {...(showsText ? { formatText: this.formatTextHandler } : {})}
                    strokeCap={this.styles.fill.lineCapRounded ? "round" : "square"}
                />
            </View>
        );
    }

    private formatText(): string | null {
        switch (this.props.circleText) {
            case "customText":
                return (this.props.customText && this.props.customText.value) || "";
            case "percentage":
                return `${Math.round(this.progress * 100)}%`;
            case "none":
                return null;
        }
    }
}

function getNumberValue(attribute: EditableValue<BigJs.Big> | undefined, staticDefault: number): number {
    return attribute && attribute.value != null ? Number(attribute.value) : staticDefault;
}
