import { ComponentType, createElement, ReactElement, useCallback, useMemo, useRef } from "react";
import { PopupMenuProps } from "../typings/PopupMenuProps";
import { defaultPopupMenuStyles, PopupMenuStyle } from "./ui/Styles";
import { executeAction } from "@widgets-resources/piw-utils";
import {
    Platform,
    TouchableHighlight,
    TouchableHighlightProps,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
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

    const Touchable: ComponentType<TouchableNativeFeedbackProps | TouchableHighlightProps> =
        Platform.OS === "android" ? TouchableNativeFeedback : TouchableHighlight;

    let menuOptions: ReactElement[];
    if (props.renderMode === "basic") {
        menuOptions = props.basicItems.map((item, index) =>
            item.itemType === "divider" ? (
                <MenuDivider key={index} color={styles.dividerColor} />
            ) : (
                // @ts-ignore since types are not correct
                <MenuItem
                    key={index}
                    onPress={() => handlePress(item.action)}
                    underlayColor={styles.menuItem?.underlayColor}
                    textStyle={styles.menuItem?.textStyle}
                    ellipsizeMode={styles.menuItem?.ellipsizeMode}
                    style={styles.menuItem?.basicItemContainer}
                    disabledTextColor={styles.menuItem?.disabledTextColor}
                >
                    {item.caption}
                </MenuItem>
            )
        );
    } else {
        menuOptions = props.complexItems.map((item, index) => (
            <Touchable
                key={index}
                onPress={() => handlePress(item.action)}
                underlayColor={styles.menuItem?.underlayColor}
                {...(Platform.OS === "android"
                    ? {
                          background: TouchableNativeFeedback.SelectableBackground()
                      }
                    : {})}
            >
                <View style={styles.menuItem?.complexItemContainer}>{item.content}</View>
            </Touchable>
        ));
    }

    return (
        <Menu
            ref={menuRef}
            button={
                <Touchable onPress={showMenu} underlayColor={styles.touchable?.underlayColor}>
                    <View style={styles.touchable?.container}>{props.menuTriggerer}</View>
                </Touchable>
            }
        >
            {menuOptions}
        </Menu>
    );
}
