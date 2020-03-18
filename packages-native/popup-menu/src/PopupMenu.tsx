import { createElement, ReactElement } from "react";
import { PopupMenuProps } from "../typings/PopupMenuProps";
import { PopUpMenuStyle } from "./ui/Styles";
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger, renderers } from "react-native-popup-menu";
import { executeAction } from "@widgets-resources/piw-utils";

export function PopupMenu(props: PopupMenuProps<PopUpMenuStyle>): ReactElement {
    const renderMenuOptions = () => {
        if (props.renderMode === "basic") {
            return props.itemsBasic.map(item => (
                <MenuOption value={item.caption} text={item.caption} onSelect={() => executeAction(item.action!)} />
            ));
        } else {
            return props.itemsComplex.map(item => <MenuOption>{item.content}</MenuOption>);
        }
    };
    // TODO: incorporate new action for Complex and divider for Basic
    // TODO: styling is off, they are adding flex:1
    return (
        <MenuProvider backHandler={props.handleBackButtonAndroid}>
            <Menu
                onSelect={value => alert(`Selected number: ${value}`)}
                renderer={renderers[props.typePopUp]}
                rendererProps={{ placement: props.preferredLocation ? props.preferredLocation : "auto" }}
            >
                <MenuTrigger children={props.menuTriggerer} />
                <MenuOptions>{renderMenuOptions()}</MenuOptions>
            </Menu>
        </MenuProvider>
    );
}
