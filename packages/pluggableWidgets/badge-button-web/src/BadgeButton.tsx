import { createElement, useCallback, ReactNode } from "react";

import { BadgeButton as BadgeButtonComponent } from "./components/BadgeButton";
import { BadgeButtonContainerProps } from "../typings/BadgeButtonProps";
import { executeAction, isAvailable } from "@mendix/piw-utils-internal";

export function BadgeButton(props: BadgeButtonContainerProps): ReactNode {
    const onClick = useCallback(() => {
        executeAction(props.onClickEvent);
    }, [props.onClickEvent]);

    return (
        <BadgeButtonComponent
            className={props.class}
            label={props.label && isAvailable(props.label) ? props.label.value : ""}
            onClick={onClick}
            style={props.style}
            value={props.value && isAvailable(props.value) ? props.value.value : ""}
        />
    );
}
