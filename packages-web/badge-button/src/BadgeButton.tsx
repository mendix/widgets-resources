import { createElement, useCallback, ReactNode } from "react";
import { hot } from "react-hot-loader/root";

import { BadgeButton as BadgeButtonComponent } from "./components/BadgeButton";
import { BadgeButtonContainerProps } from "../typings/BadgeButtonProps";
import { executeAction } from "@widgets-resources/piw-utils";

const BadgeButton = (props: BadgeButtonContainerProps): ReactNode => {
    const onClick = useCallback(() => {
        executeAction(props.onClickEvent);
    }, [props.onClickEvent]);

    return (
        <BadgeButtonComponent
            bootstrapStyle={props.bootstrapStyle}
            className={props.class}
            label={props.label && props.label.status === "available" ? props.label.value : ""}
            onClickAction={onClick}
            style={props.style}
            value={props.value && props.value.status === "available" ? props.value.value : ""}
        />
    );
};

export default hot(BadgeButton);
