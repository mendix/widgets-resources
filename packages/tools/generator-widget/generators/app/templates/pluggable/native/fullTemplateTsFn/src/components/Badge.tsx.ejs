import { ReactElement, createElement, ElementType, useMemo } from "react";
import { Platform, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { BadgeStyle, defaultBadgeStyle } from "../ui/styles";

export interface BadgeProps {
    value: string;
    style: BadgeStyle[];
    onClick: () => void;
}

export function Badge({ value, style, onClick }: BadgeProps): ReactElement {
    const styles = mergeNativeStyles(defaultBadgeStyle, style);

    const Touchable: ElementType = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    const renderContent = useMemo(() => {
        const text = <Text style={styles.label}>{value}</Text>;

        if (Platform.OS === "android") {
            return <View style={styles.badge}>{text}</View>;
        }

        return text;
    }, [styles, value]);

    return (
        <View style={styles.container}>
            <Touchable style={styles.badge} onPress={onClick} useForeground={true}>
                {renderContent}
            </Touchable>
        </View>
    );

}
