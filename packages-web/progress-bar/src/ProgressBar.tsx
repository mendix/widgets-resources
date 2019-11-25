import { FunctionComponent, createElement, useCallback } from "react";
import { hot } from "react-hot-loader/root";

import { DynamicValue, ValueStatus, EditableValue } from "mendix";
import { executeAction } from "@widgets-resources/piw-utils";

import { BarStyle, ProgressBar as ProgressBarComponent } from "./components/ProgressBar";
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
            text={getTextValue(props.text)}
            minimumValue={getValue(props.minimumValue)}
            maximumValue={getValue(props.maximumValue)}
            onClickAction={props.onClick && props.onClick.canExecute ? onClick : undefined}
            progress={getValue(props.value)}
            style={props.style}
        />
    );
};

function getValue(attribute: DynamicValue<BigJs.Big>): number | undefined {
    return attribute.status === ValueStatus.Available && attribute.value ? Number(attribute.value) : undefined;
}

function getBarStyle(style: EditableValue<string> | undefined, defaultStyle: BarStyle): BarStyle {
    if (style && style.status === ValueStatus.Available && style.value) {
        const value = style.value;
        // TODO can this be checked based on style?
        // maybe via https://basarat.gitbooks.io/typescript/docs/types/literal-types.html
        const options = ["default", "info", "primary", "success", "warning", "danger", "inverse"];
        if (options.indexOf(value)) {
            return value as BarStyle;
        }
    }

    return defaultStyle;
}

function getTextValue(text?: DynamicValue<string>): string | undefined {
    return text && text.status === ValueStatus.Available ? text.value : undefined;
}

export default hot(ProgressBar);
