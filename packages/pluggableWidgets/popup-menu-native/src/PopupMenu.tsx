import { ComponentType, createElement, ReactElement, useCallback, useRef, Fragment } from "react";
import { PopupMenuProps } from "../typings/PopupMenuProps";
import { PopupMenuStyle } from "./ui/Styles";
import { executeAction } from "@widgets-resources/piw-utils";
import {
    Platform,
    StyleSheet,
    TouchableHighlight,
    TouchableHighlightProps,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
    TouchableOpacity,
    View
} from "react-native";
import { ActionValue } from "mendix";
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";

const TouchableItem: ComponentType<TouchableNativeFeedbackProps | TouchableHighlightProps> =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableHighlight;

const TouchableButton: ComponentType<TouchableNativeFeedbackProps | TouchableOpacity> =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

export function PopupMenu(props: PopupMenuProps<PopupMenuStyle>): ReactElement {
    const styles = StyleSheet.flatten(props.style);

    const menuRef = useRef<Menu | null>(null);
    const showMenu = useCallback(() => {
        menuRef.current?.show();
    }, [menuRef.current]);
    const handlePress = useCallback(
        (action?: ActionValue) => {
            menuRef.current?.hide();
            // Set timeout needed since modal closes the alerts which might be shown in action
            setTimeout(() => {
                executeAction(action);
            }, 500);
        },
        [menuRef.current]
    );

    let menuOptions: ReactElement[];
    if (props.renderMode === "basic") {
        menuOptions = props.basicItems.map((item, index) => {
            const itemStyle = styles.basic?.itemStyle && styles.basic?.itemStyle[item.styleClass];
            return item.itemType === "divider" ? (
                <MenuDivider key={index} color={styles.basic?.dividerColor} />
            ) : (
                <MenuItem
                    key={index}
                    onPress={() => handlePress(item.action)}
                    textStyle={itemStyle}
                    ellipsizeMode={styles.basic?.itemStyle?.ellipsizeMode as any}
                    style={styles.basic?.container as any}
                    {...getRippleColor(styles.basic?.itemStyle?.rippleColor)}
                >
                    {item.caption}
                </MenuItem>
            );
        });
    } else {
        menuOptions = props.customItems.map((item, index) => (
            <TouchableItem
                key={index}
                style={styles.custom?.container}
                onPress={() => handlePress(item.action)}
                {...getRippleColor(styles.custom?.itemStyle?.rippleColor)}
            >
                {Platform.OS === "android" ? (
                    <View style={styles.custom?.container}>{item.content}</View>
                ) : (
                    <Fragment>{item.content}</Fragment>
                )}
            </TouchableItem>
        ));
    }

    return (
        <Menu
            animationDuration={150}
            ref={menuRef}
            style={styles?.container as any}
            button={
                <TouchableButton onPress={showMenu}>
                    <View pointerEvents="box-only" style={styles.buttonContainer}>
                        {props.menuTriggerer}
                    </View>
                </TouchableButton>
            }
        >
            <View style={{ overflow: "hidden", borderRadius: styles.container?.borderRadius }}>{menuOptions}</View>
        </Menu>
    );
}

function getRippleColor(color: string | undefined) {
    if (color) {
        return Platform.OS === "android"
            ? color && { background: TouchableNativeFeedback.Ripple(color, false) }
            : { underlayColor: color };
    }
    return undefined;
}
