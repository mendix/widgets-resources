import { createElement, useCallback, ReactNode } from "react";
import { hot } from "react-hot-loader/root";

import { BadgeButton as BadgeButtonComponent } from "./components/BadgeButton";
import { BadgeButtonContainerProps } from "../typings/BadgeButtonProps";

const BadgeButton = (props: BadgeButtonContainerProps): ReactNode => {
    const onClick = useCallback(() => {
        if (props.onClickEvent && props.onClickEvent.canExecute) {
            props.onClickEvent.execute();
        }
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
