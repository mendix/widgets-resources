import { RepeaterProps } from "../typings/RepeaterProps";
import { defaultRepeaterStyle, RepeaterStyle } from "./ui/Styles";
import { createElement, ReactElement, Fragment } from "react";
import { View } from "react-native";
import { ValueStatus } from "mendix";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

export function Repeater(props: RepeaterProps<RepeaterStyle>): ReactElement {
    const styles = mergeNativeStyles(defaultRepeaterStyle, props.style);
    if (
        props.datasource.status === ValueStatus.Loading ||
        !props.datasource.items ||
        props.datasource.items.length === 0
    ) {
        return <View />;
    }

    return (
        <View style={styles.container}>
            {props.datasource.items?.map((item, index) => (
                <Fragment key={`item_${index}`}>{props.content.get(item)}</Fragment>
            ))}
        </View>
    );
}
