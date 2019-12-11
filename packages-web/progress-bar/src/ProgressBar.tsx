import { FunctionComponent, createElement, useCallback } from "react";
import { hot } from "react-hot-loader/root";

import { EditableValue } from "mendix";
import {
    executeAction,
    getNumberValue,
    getValue,
    BootstrapStyle,
    BootstrapStyleKey
} from "@widgets-resources/piw-utils";

import { ProgressBar as ProgressBarComponent } from "./components/ProgressBar";
import { ProgressBarContainerProps } from "../typings/ProgressBarProps";

const ProgressBar: FunctionComponent<ProgressBarContainerProps> = props => {
    const onClick = useCallback(() => {
        executeAction(props.onClick);
    }, [props.onClick]);

    return (
        <ProgressBarComponent
            barType={props.barType}
            bootstrapStyle={getBarStyle(props.bootstrapStyleAttribute, props.bootstrapStyle)}
            className={props.class}
            showContent={props.showContent}
            text={getValue(props.text)}
            minimumValue={getNumberValue(props.minimumValue)}
            maximumValue={getNumberValue(props.maximumValue)}
            onClickAction={props.onClick && props.onClick.canExecute ? onClick : undefined}
            progress={getNumberValue(props.value)}
            style={props.style}
        />
    );
};

function getBarStyle(style: EditableValue<string> | undefined, defaultStyle: BootstrapStyleKey): BootstrapStyleKey {
    const value = getValue(style);
    if (value) {
        if (value in BootstrapStyle) {
            return value as BootstrapStyleKey;
        }
    }

    return defaultStyle;
}

export default hot(ProgressBar);
