import { ComponentType, createElement, Fragment, ReactElement, useCallback, useRef } from "react";
import { PopupMenuProps } from "../typings/PopupMenuProps";
import { PopupMenuStyle } from "./ui/Styles";
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
                <Fragment>{item.content}</Fragment>
            </Touchable>
        ));
    }

    return (
        <Menu
            ref={menuRef}
            style={styles?.container as any}
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
