import { ReactNode, createElement } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { RadioButton } from "./components/RadioButton";
import { RadioButtonsProps } from "../typings/RadioButtonsProps";

export interface RadioItemCustomStyle extends Style {
    itemContainerStyle: ViewStyle;
    textStyle: TextStyle;
    buttonContainerStyle: ViewStyle;
}

export interface CustomStyle extends Style {
    container: ViewStyle;
    itemStyle: RadioItemCustomStyle;
}

// const defaultStyle: style = {};

export function RadioButtons(props: RadioButtonsProps<CustomStyle>): ReactNode {
    console.error(props);
    // const styles = mergeNativeStyles(defaultStyle, props.style);

    return <View>
    {props.enum.universe?.map((title)=><RadioButton active={props.enum.displayValue===title} title={title} />)}
    </View>;
}
