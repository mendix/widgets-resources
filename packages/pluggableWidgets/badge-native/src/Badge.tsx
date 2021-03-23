import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { createElement, ReactElement, useCallback } from "react";
import { Pressable, Text, View } from "react-native";

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
    }, [props.caption, styles]);

    return (
        <View style={styles.container} testID={props.name}>
            {props.onClick ? (
                <Pressable
                    onPress={() => executeAction(props.onClick)}
                    android_ripple={{
                        color: styles.container.rippleColor
                    }}
                >
                    {renderText()}
                </Pressable>
            ) : (
                renderText()
            )}
        </View>
    );
}
