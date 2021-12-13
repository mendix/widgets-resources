import { ReactElement, createElement, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { OrientationEnum } from "../../typings/RadioButtonProps";

import { RadioButtonStyle } from "../ui/Styles";

export interface RadioButtonProps {
    caption: string;
    name: string;
    active: boolean;
    orientation: OrientationEnum;
    style: RadioButtonStyle;
    disabled: boolean;
    onRadioButtonPress: (name: string) => void;
}

export function RadioButton({
    caption,
    name,
    active,
    style,
    disabled,
    onRadioButtonPress
}: RadioButtonProps): ReactElement {
    const renderText = useCallback(
        () => <Text style={[style.caption, disabled === true ? style.disabledCaption : null]}>{caption}</Text>,
        [disabled, active, caption]
    );
    const renderRadioCircleButton = useCallback(
        () => (
            <View style={[style.defaultCircleRadioButton, disabled === true ? style.disabledCircleRadioButton : null]}>
                {active ? (
                    <View
                        style={[
                            style.activeCircleRadioButton,
                            disabled === true ? style.disabledCircleRadioButton : null
                        ]}
                    />
                ) : null}
            </View>
        ),
        [disabled, active]
    );

    return (
        <Pressable
            testID={`${name}.${caption}`}
            style={style.radioButtonContainer}
            onPress={() => onRadioButtonPress(name)}
        >
            {renderRadioCircleButton()}
            {renderText()}
        </Pressable>
    );
}
