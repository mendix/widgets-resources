import { Component, ReactNode, createElement } from "react";
import { Text, View } from "react-native";

// import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { RadioItemCustomStyle } from "../RadioButtons";
import { styles } from "../ui/RadioButton.styles";

export interface RadioButtonProps {
    title: string;
    active: boolean;
    style?: RadioItemCustomStyle;
}

// const defaultStyle: RadioItemCustomStyle = {
//     buttonContainerStyle: {},
//     itemContainerStyle: {},
//     textStyle: {}
// };

export class RadioButton extends Component<RadioButtonProps> {
    render(): ReactNode {
        return (
            <View>
                <Text>{this.props.title}</Text>
                <View style={[styles.circularBtnStyle, this.props.active && styles.activeBtnStyle]} />
            </View>
        );
    }
}
