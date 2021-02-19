import { ReactNode, useCallback, createElement, KeyboardEvent } from "react";
import { executeAction } from "@widgets-resources/piw-utils";

import { BadgeContainerProps } from "../typings/BadgeProps";
import { Badge as DisplayBadge } from "./components/Badge";

export default function Badge(props: BadgeContainerProps): ReactNode {
    const onClick = useCallback(() => executeAction(props.onClick), [props.onClick]);

    const onKeyDown = useCallback(
        (event: KeyboardEvent<HTMLSpanElement>) => {
            if (event.key === "Enter" || event.key === " ") {
                onClick();
            }
        },
        [onClick]
    );

    const clickable = props.onClick && props.onClick.canExecute;

    return (
        <DisplayBadge
            type={props.type}
            value={props.value?.value ?? ""}
            onClick={clickable ? onClick : undefined}
            onKeyDown={clickable ? onKeyDown : undefined}
            className={props.class}
            style={props.style}
            tabIndex={clickable ? props.tabIndex ?? 0 : undefined}
        />
    );
}
