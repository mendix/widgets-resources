import { RepeaterProps } from "../typings/RepeaterProps";
import { defaultRepeaterStyle, RepeaterStyle } from "./ui/Styles";
import { createElement, ReactElement, useCallback, Fragment, useMemo } from "react";
import { View } from "react-native";
import { ActionValue, ValueStatus } from "mendix";
import { executeAction } from "@widgets-resources/piw-utils";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";
import { Touchable } from "./Touchable";

export function Repeater(props: RepeaterProps<RepeaterStyle>): ReactElement {
    const styles = mergeNativeStyles(defaultRepeaterStyle, props.style);
    if (
        props.datasource.status === ValueStatus.Loading ||
        !props.datasource.items ||
        props.datasource.items.length === 0
    ) {
        return <View />;
    }

    const onClick = useCallback((action: ActionValue) => {
        executeAction(action);
    }, []);

    const items = useMemo(
        () =>
            props.datasource.items?.map((item, index) => {
                const action = props.onClick?.(item);

                return action ? (
                    <Touchable key={index} onPress={() => onClick(action)} style={styles.container}>
                        {props.content(item)}
                    </Touchable>
                ) : (
                    <View key={index} style={styles.container}>
                        {props.content(item)}
                    </View>
                );
            }),
        [props.datasource, props.onClick, props.content]
    );

    return <Fragment>{items}</Fragment>;
}
