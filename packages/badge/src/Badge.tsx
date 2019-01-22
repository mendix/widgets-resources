import * as React from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { NativeBadgeProps } from "../typings/NativeBadgeProps";

import { styles } from "./ui/Styles";

export class Badge extends React.Component<NativeBadgeProps> {
    private readonly onClickHandler = this.onClick.bind(this);

    render(): JSX.Element {
        const isAndroid = Platform.OS === "android";
        const touchableStyle = [
            this.props.type === "badge" ? styles.badge : styles.label,
            styles[`badge-${this.props.badgeStyle}`]
        ];
        const textStyle = [styles.labelText, styles[`label-${this.props.badgeStyle}`]];
        const value = this.props.valueAttribute ? this.props.valueAttribute.value : "";

        return (
            <View style={styles.flex}>
                {isAndroid ? (
                    <TouchableNativeFeedback style={touchableStyle} onPress={this.onClickHandler}>
                        <Text style={textStyle}>{value}</Text>
                    </TouchableNativeFeedback>
                ) : (
                    <TouchableOpacity style={touchableStyle} onPress={this.onClickHandler}>
                        <Text style={textStyle}>{value}</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    private onClick(): void {
        if (this.props.onClickAction && this.props.onClickAction.canExecute) {
            this.props.onClickAction.execute();
        }
    }
}
