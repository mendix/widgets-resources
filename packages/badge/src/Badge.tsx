import { flattenStyles, Style } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { Platform, Text, TextStyle, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from "react-native";

import { BadgeProps } from "../typings/BadgeProps";
import { styles } from "./ui/Styles";

interface BadgeStyle extends Style {
    container: ViewStyle;
    text: TextStyle;
}

const defaultBadgeStyle: BadgeStyle = {
    container: styles.badge,
    text: styles.text
};

export class Badge extends Component<BadgeProps<BadgeStyle>> {
    private readonly onClickHandler = this.onClick.bind(this);
    private readonly styles = flattenStyles(defaultBadgeStyle, this.props.style);

    render(): JSX.Element {
        const isAndroid = Platform.OS === "android";

        return (
            <View style={styles.container}>
                <View style={this.styles.container}>
                    {this.props.onClick ? (
                        isAndroid ? (
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                                onPress={this.onClickHandler}
                            >
                                {this.renderText()}
                            </TouchableNativeFeedback>
                        ) : (
                            <TouchableOpacity onPress={this.onClickHandler}>{this.renderText()}</TouchableOpacity>
                        )
                    ) : (
                        this.renderText()
                    )}
                </View>
            </View>
        );
    }

    private renderText(): JSX.Element {
        const value = this.props.value ? this.props.value.value : this.props.defaultValue;

        return <Text style={this.styles.text}>{value}</Text>;
    }

    private onClick(): void {
        if (this.props.onClick && this.props.onClick.canExecute) {
            this.props.onClick.execute();
        }
    }
}
