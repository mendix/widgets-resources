import { Component, ReactNode, createElement, ElementType } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { BadgeStyle, defaultBadgeStyle } from "../ui/styles";

export interface BadgeProps {
    value: string;
    style: BadgeStyle[];
    onClick: () => void;
}

export class Badge extends Component<BadgeProps> {
    private readonly styles = mergeNativeStyles(defaultBadgeStyle, this.props.style);

    render(): ReactNode {
        const Touchable: ElementType = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

        return (
            <View style={this.styles.container}>
                <Touchable style={this.styles.badge} onPress={this.props.onClick} useForeground={true}>
                    {this.renderContent()}
                </Touchable>
            </View>
        );
    }

    private renderContent(): ReactNode {
        const text = <Text style={this.styles.label}>{this.props.value}</Text>;

        if (Platform.OS === "android") {
            return <View style={this.styles.badge}>{text}</View>;
        }

        return text;
    }
}
