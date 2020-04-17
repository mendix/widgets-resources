import { ComponentType, createElement, ReactElement, useCallback, useRef } from "react";
import { PopupMenuProps } from "../typings/PopupMenuProps";
import { BasicItemStyle, PopupMenuStyle } from "./ui/Styles";
import { executeAction } from "@widgets-resources/piw-utils";
import {
    Platform,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
    TouchableOpacity,
    View
} from "react-native";
import { ActionValue } from "mendix";
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";

export function PopupMenu(props: PopupMenuProps<PopupMenuStyle>): ReactElement {
    const styles = StyleSheet.flatten(props.style);

    const menuRef = useRef<Menu>(null);
    const showMenu = useCallback(() => {
        menuRef.current?.show();
    }, [menuRef.current]);
    const handlePress = useCallback(
        (action?: ActionValue) => {
            menuRef.current?.hide();
            executeAction(action);
        },
        [menuRef.current]
    );

    const Touchable: ComponentType<TouchableNativeFeedbackProps | TouchableOpacity> =
        Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    let menuOptions: ReactElement[];
    if (props.renderMode === "basic") {
        menuOptions = props.basicItems.map((item, index) => {
            const menuStyle: BasicItemStyle | undefined = styles.itemStyle?.[item.styleClass];
            return item.itemType === "divider" ? (
                <MenuDivider key={index} color={menuStyle?.dividerColor} />
            ) : (
                <MenuItem
                    key={index}
                    onPress={() => handlePress(item.action)}
                    textStyle={menuStyle?.textStyle}
                    ellipsizeMode={menuStyle?.ellipsizeMode as any}
                    style={styles.itemStyle?.container as any}
                >
                    {item.caption}
                </MenuItem>
            );
        });
    } else {
        menuOptions = props.customItems.map((item, index) => (
            <Touchable
                key={index}
                onPress={() => handlePress(item.action)}
                {...(Platform.OS === "android"
                    ? {
                          background: TouchableNativeFeedback.SelectableBackground()
                      }
                    : {})}
            >
                <View style={styles.itemStyle?.container}>{item.content}</View>
            </Touchable>
        ));
    }

    return (
        <Menu
            ref={menuRef}
            button={
                <Touchable onPress={showMenu}>
                    <View style={styles.buttonContainer}>{props.menuTriggerer}</View>
                </Touchable>
            }
        >
            {menuOptions}
        </Menu>
    );
}
