import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { BadgeProps } from "../typings/BadgeProps";
import { BadgeStyle, defaultBadgeStyle, styles } from "./ui/Styles";

export type Props = BadgeProps<BadgeStyle>;

export class Badge extends Component<Props> {
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
        const value = this.props.caption.value || "";

        return <Text style={this.styles.text}>{value}</Text>;
    }

    private onClick(): void {
        if (this.props.onClick && this.props.onClick.canExecute) {
            this.props.onClick.execute();
        }
    }
}
