import { ComponentType, createElement, ReactElement, useCallback, useRef } from "react";
import { PopupMenuProps } from "../typings/PopupMenuProps";
import { defaultPopupMenuStyles, PopupMenuStyle } from "./ui/Styles";
import { executeAction } from "@widgets-resources/piw-utils";
import { Platform, TouchableNativeFeedback, TouchableNativeFeedbackProps, TouchableOpacity, View } from "react-native";
import { ActionValue } from "mendix";
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";

export function PopupMenu(props: PopupMenuProps<PopupMenuStyle>): ReactElement {
    const menuRef = useRef<any>(null);

    const showMenu = useCallback(() => {
        menuRef.current?.show();
    }, [menuRef.current]);

    const handlePress = (action?: ActionValue) => {
        if (props.closeMenuOnItemClick) {
            menuRef.current?.hide();
        }
        executeAction(action);
    };

    const renderMenuOptions = () => {
        if (props.renderMode === "basic") {
            return props.itemsBasic.map((item, index) => {
                if (item.itemType === "divider") {
                    return <MenuDivider />;
                }
                return (
                    <MenuItem key={index} onPress={() => handlePress(item.action)}>
                        {item.caption}
                    </MenuItem>
                );
            });
        }

        const Touchable: ComponentType<TouchableNativeFeedbackProps> =
            Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

        const touchableProps =
            Platform.OS === "android" ? { background: TouchableNativeFeedback.SelectableBackground() } : {};

        return props.itemsComplex.map((item, index) => (
            <Touchable key={index} onPress={() => handlePress(item.action)} {...touchableProps}>
                <View style={defaultPopupMenuStyles.customItemContainer}>{item.content}</View>
            </Touchable>
        ));
    };

    return (
        <Menu ref={menuRef} button={<TouchableOpacity onPress={showMenu}>{props.menuTriggerer}</TouchableOpacity>}>
            {renderMenuOptions()}
        </Menu>
    );
}
