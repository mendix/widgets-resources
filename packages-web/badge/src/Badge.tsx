import { hot } from "react-hot-loader/root";
import { ReactNode, useCallback, createElement } from "react";
import { BadgeContainerProps } from "../typings/BadgeProps";
import { Badge as DisplayBadge } from "./components/Badge";
import { ValueStatus } from "mendix";
import { executeAction } from "@widgets-resources/piw-utils";

const Badge = (props: BadgeContainerProps): ReactNode => {
    const onClick = useCallback(() => {
        executeAction(props.onClick);
    }, [props.onClick]);

    return (
        <DisplayBadge
            type={props.type}
            defaultValue={
                props.defaultValue && props.defaultValue.status === ValueStatus.Available
                    ? props.defaultValue.value
                    : undefined
            }
            value={
                props.valueAttribute && props.valueAttribute.status === ValueStatus.Available
                    ? String(props.valueAttribute.value)
                    : undefined
            }
            bootstrapStyle={props.bootstrapStyle}
            clickable={props.onClick.canExecute}
            onClick={onClick}
            className={props.class}
            style={props.style}
        />
    );
};

export default hot(Badge);
