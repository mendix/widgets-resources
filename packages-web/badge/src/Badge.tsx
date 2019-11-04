import { hot } from "react-hot-loader/root";
import { ReactNode, useCallback, createElement } from "react";
import { BadgeContainerProps } from "../typings/BadgeProps";
import { Badge as DisplayBadge } from "./components/Badge";
import { executeAction } from "@widgets-resources/piw-utils";

const Badge = (props: BadgeContainerProps): ReactNode => {
    const onClick = useCallback(() => {
        executeAction(props.onClick);
    }, [props.onClick]);

    return (
        <DisplayBadge
            type={props.type}
            defaultValue={
                // TODO: Use ValueStatus enum from Mendix when it is properly exposed to widgets
                props.defaultValue && props.defaultValue.status === "available" ? props.defaultValue.value : undefined
            }
            value={
                // TODO: Use ValueStatus enum from Mendix when it is properly exposed to widgets
                props.valueAttribute && props.valueAttribute.status === "available"
                    ? String(props.valueAttribute.value)
                    : undefined
            }
            bootstrapStyle={props.bootstrapStyle}
            clickable={props.onClick && props.onClick.canExecute}
            onClick={onClick}
            className={props.class}
            style={props.style}
        />
    );
};

export default hot(Badge);
