import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { BadgeProps } from "../typings/BadgeProps";
import { BadgeStyle, defaultBadgeStyle } from "./ui/Styles";
import { executeAction } from "@widgets-resources/piw-utils";

export type Props = BadgeProps<BadgeStyle>;

export class Badge extends Component<Props> {
    private readonly onClickHandler = this.onClick.bind(this);
    private readonly styles = flattenStyles(defaultBadgeStyle, this.props.style);

    render(): JSX.Element {
        const isAndroid = Platform.OS === "android";

        return (
            <View style={this.styles.container} testID={this.props.name}>
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
        );
    }

    private renderText(): JSX.Element {
        const value = this.props.caption.value || "";

        return (
            <Text testID={`${this.props.name}$caption`} style={this.styles.caption}>
                {value}
            </Text>
        );
    }

    private onClick(): void {
        executeAction(this.props.onClick);
    }
}
