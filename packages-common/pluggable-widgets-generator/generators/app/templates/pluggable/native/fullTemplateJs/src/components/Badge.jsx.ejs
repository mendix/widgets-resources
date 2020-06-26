import { Component, createElement } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { defaultBadgeStyle } from "../ui/styles";

export class Badge extends Component {
    styles = mergeNativeStyles(defaultBadgeStyle, this.props.style);

    render() {
        const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

        return (
            <View style={this.styles.container}>
                <Touchable style={this.styles.badge} onPress={this.props.onClick} useForeground={true}>
                    {this.renderContent()}
                </Touchable>
            </View>
        );
    }

    renderContent() {
        const text = <Text style={this.styles.label}>{this.props.value}</Text>;

        if (Platform.OS === "android") {
            return <View style={this.styles.badge}>{text}</View>;
        }

        return text;
    }
}
