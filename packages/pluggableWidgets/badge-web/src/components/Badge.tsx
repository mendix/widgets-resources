import { createElement, CSSProperties, KeyboardEvent, ReactElement } from "react";
import classNames from "classnames";

export interface BadgeProps {
    type: "badge" | "label";
    className?: string;
    style?: CSSProperties;
    value: string;
    onClick?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLSpanElement>) => void;
    tabIndex?: number;
}

export const Badge = (props: BadgeProps): ReactElement => {
    const { type, className, style, value, onClick, onKeyDown, tabIndex } = props;

    return (
        <span
            role={onClick || onKeyDown ? "button" : undefined}
            className={classNames("widget-badge", type, className, {
                "widget-badge-clickable": onClick
            })}
            onClick={onClick}
            onKeyDown={onKeyDown}
            style={style}
            tabIndex={tabIndex}
        >
            {value}
        </span>
    );
};
