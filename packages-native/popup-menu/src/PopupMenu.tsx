import { ComponentType, createElement, ReactElement, useCallback, useRef } from "react";
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

    const TouchableItem: ComponentType<TouchableNativeFeedbackProps | TouchableHighlightProps> =
        Platform.OS === "android" ? TouchableNativeFeedback : TouchableHighlight;

    const TouchableButton: ComponentType<TouchableNativeFeedbackProps | TouchableOpacity> =
        Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    const rippleColorProp =
        Platform.OS === "android"
            ? styles.itemRippleColor && { background: TouchableNativeFeedback.Ripple(styles.itemRippleColor, false) }
            : { underlayColor: styles.itemRippleColor };

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
                    style={styles.basic?.containerStyle as any}
                    {...rippleColorProp}
                >
                    {item.caption}
                </MenuItem>
            );
        });
    } else {
        menuOptions = props.customItems.map((item, index) => (
            <TouchableItem key={index} onPress={() => handlePress(item.action)} {...rippleColorProp}>
                <View>{item.content}</View>
            </TouchableItem>
        ));
    }

    return (
        <Menu
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
            {menuOptions}
        </Menu>
    );
}
