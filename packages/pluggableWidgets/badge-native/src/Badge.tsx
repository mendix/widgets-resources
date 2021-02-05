import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { createElement, ReactElement, useCallback } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { BadgeProps } from "../typings/BadgeProps";
import { BadgeStyle, defaultBadgeStyle } from "./ui/Styles";
import { executeAction, isAvailable } from "@widgets-resources/piw-utils";

export type Props = BadgeProps<BadgeStyle>;

export function Badge(props: BadgeProps<BadgeStyle>): ReactElement {
    const styles = flattenStyles(defaultBadgeStyle, props.style);

    const renderText = useCallback(() => {
        return (
            <Text testID={`${props.name}$caption`} style={styles.caption}>
                {isAvailable(props.caption) ? props.caption.value : ""}
            </Text>
        );
    }, [props.caption.value, props.caption.status, styles]);

    return (
        <View style={styles.container} testID={props.name}>
            {props.onClick ? (
                Platform.OS === "android" ? (
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                        onPress={() => executeAction(props.onClick)}
                    >
                        {renderText()}
                    </TouchableNativeFeedback>
                ) : (
                    <TouchableOpacity onPress={() => executeAction(props.onClick)}>{renderText()}</TouchableOpacity>
                )
            ) : (
                renderText()
            )}
        </View>
    );
}
