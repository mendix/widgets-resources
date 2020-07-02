import { Component, createElement } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { styles } from "../ui/styles";
import { flattenStyles } from "../utils/common";

const defaultBadgeStyle = {
    container: styles.flex,
    badge: styles.badge,
    label: styles.label
};

export class BadgeSample extends Component {
    styles = flattenStyles(defaultBadgeStyle, this.props.style);

    render() {
        const isAndroid = Platform.OS === "android";

        return (
            <View style={this.styles.container}>
                {isAndroid ? (
                    <TouchableNativeFeedback
                        style={this.styles.badge}
                        onPress={this.props.onClickAction}>
                        <Text
                            style={this.styles.label}>{this.props.value}</Text>
                    </TouchableNativeFeedback>
                ) : (
                    <TouchableOpacity style={this.styles.badge}
                        onPress={this.props.onClickAction}>
                        <Text
                            style={this.styles.label}>{this.props.value}</Text>
                    </TouchableOpacity>
                )
                }
            </View>
        );
    }
}
