import { Component, createElement } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { BadgeProps } from "../typings/BadgeProps";
import { styles } from "./ui/Styles";

export class Badge extends Component<BadgeProps> {
    private readonly onClickHandler = this.onClick.bind(this);

    render(): JSX.Element {
        const isAndroid = Platform.OS === "android";
        const componentStyle = [
            this.props.type === "badge" ? styles.badge : styles.label,
            (styles as any)[`background-${this.props.color}`]
        ];

        return (
            <View style={styles.container}>
                {this.props.onClick ? (
                    isAndroid ? (
                        <TouchableNativeFeedback style={componentStyle} onPress={this.onClickHandler}>
                            {this.renderText()}
                        </TouchableNativeFeedback>
                    ) : (
                        <TouchableOpacity style={componentStyle} onPress={this.onClickHandler}>
                            {this.renderText()}
                        </TouchableOpacity>
                    )
                ) : (
                    <View style={componentStyle}>{this.renderText()}</View>
                )}
            </View>
        );
    }

    private renderText(): JSX.Element {
        const textStyle = [styles.text, (styles as any)[`text-${this.props.color}`]];
        const value = this.props.value ? this.props.value.value : this.props.defaultValue;

        return <Text style={textStyle}>{value}</Text>;
    }

    private onClick(): void {
        if (this.props.onClick && this.props.onClick.canExecute) {
            this.props.onClick.execute();
        }
    }
}
