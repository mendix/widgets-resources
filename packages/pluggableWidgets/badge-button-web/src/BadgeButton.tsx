import { createElement, useCallback, ReactNode } from "react";

import { BadgeButton as BadgeButtonComponent } from "./components/BadgeButton";
import { BadgeButtonContainerProps } from "../typings/BadgeButtonProps";
import { executeAction } from "@mendix/piw-utils-internal";

export default function BadgeButton(props: BadgeButtonContainerProps): ReactNode {
    const onClick = useCallback(() => {
        executeAction(props.onClickEvent);
    }, [props.onClickEvent]);

    return (
        <BadgeButtonComponent
            bootstrapStyle={props.bootstrapStyle}
            className={props.class}
            label={props.label && props.label.status === "available" ? props.label.value : ""}
            onClick={onClick}
            style={props.style}
            value={props.value && props.value.status === "available" ? props.value.value : ""}
        />
    );
}
