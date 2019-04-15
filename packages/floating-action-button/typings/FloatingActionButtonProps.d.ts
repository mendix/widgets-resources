/**
 * This file was generated from FloatingActionButton.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ImageURISource } from "react-native";

interface CommonProps<Style> {
    style: Style[];
}

export type HorizontalPositionEnum = "left" | "center" | "right";

export type VerticalPositionEnum = "top" | "bottom";

export interface SpeedDialButtonsType {
    icon: any;
    caption?: DynamicValue<string>;
    action: ActionValue;
}

export interface FloatingActionButtonProps<Style> extends CommonProps<Style> {
    icon?: any;
    iconActive?: any;
    horizontalPosition: HorizontalPositionEnum;
    verticalPosition: VerticalPositionEnum;
    onPress: ActionValue;
    speedDialButtons: SpeedDialButtonsType[];
}
