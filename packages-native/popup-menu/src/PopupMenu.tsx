import { ComponentType, createElement, ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { PopupMenuProps } from "../typings/PopupMenuProps";
import { defaultPopupMenuStyles, PopupMenuStyle } from "./ui/Styles";
import { executeAction } from "@widgets-resources/piw-utils";
import {
    BackHandler,
    Platform,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
    TouchableOpacity,
    TouchableOpacityProps,
    View
} from "react-native";
import { ActionValue } from "mendix";
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";
import deepmerge from "deepmerge";

export function PopupMenu(props: PopupMenuProps<PopupMenuStyle>): ReactElement {
    const styles = useMemo(
        () => deepmerge.all<PopupMenuStyle>([defaultPopupMenuStyles, ...props.style]),
        [props.style]
    );

    const menuRef = useRef<any>(null);
    const showMenu = useCallback(() => {
        menuRef.current?.show();
    }, [menuRef]);
    const handlePress = useCallback(
        (action?: ActionValue) => {
            menuRef.current?.hide();
            executeAction(action);
        },
        [menuRef]
    );

    useEffect(() => {
        const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
            menuRef.current?.hide();
            return undefined;
        });
        return () => subscription.remove();
    }, [menuRef]);

    const Touchable: ComponentType<TouchableNativeFeedbackProps | TouchableOpacityProps> =
        Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    let menuOptions: ReactElement[];
    if (props.renderMode === "basic") {
        menuOptions = props.itemsBasic.map((item, index) =>
            item.itemType === "divider" ? (
                <MenuDivider key={index} color={styles.dividerColor} />
            ) : (
                <MenuItem
                    key={index}
                    onPress={() => handlePress(item.action)}
                    underlayColor={styles.menuItem?.underlayColor}
                    textStyle={styles.menuItem?.textStyle}
                >
                    {item.caption}
                </MenuItem>
            )
        );
    } else {
        const touchableProps =
            Platform.OS === "android"
                ? {
                      background: TouchableNativeFeedback.SelectableBackground(),
                      underlayColor: styles.menuItem?.underlayColor
                  }
                : {};
        menuOptions = props.itemsComplex.map((item, index) => (
            <Touchable key={index} onPress={() => handlePress(item.action)} {...touchableProps}>
                <View style={styles.customItemContainer}>{item.content}</View>
            </Touchable>
        ));
    }

    return (
        <Menu
            ref={menuRef}
            button={
                <Touchable onPress={showMenu}>
                    <View>{props.menuTriggerer}</View>
                </Touchable>
            }
        >
            {menuOptions}
        </Menu>
    );
}
