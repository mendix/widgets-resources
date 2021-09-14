import { createElement, CSSProperties, HTMLAttributes, ReactElement } from "react";
import classNames from "classnames";
import { WebIcon } from "mendix";
import { Icon } from "@mendix/piw-utils-internal/components/web";

interface ToggleProps {
    caption?: string;
    className: string;
    icon?: WebIcon;
    tabIndex?: number;
    tooltip?: string;
    render: "button" | "link";
    role?: string;
    style?: CSSProperties;
}

export function Toggle(props: ToggleProps): ReactElement {
    const commonProps = {
        tabIndex: props.tabIndex,
        title: props.tooltip,
        "aria-label": props.tooltip,
        style: props.style
    };

    const icon = <Icon icon={props.icon} className="widget-sidebar-toggle-icon" fallback={<span />} />;

    const prepareRole = (text?: string): string | undefined => text?.replace(/_/g, "-");

    const action = (): void => {
        document.dispatchEvent(new CustomEvent("toggleSidebar"));
    };

    const events: Partial<HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>> = {
        onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            action();
        },
        onKeyDown: e => {
            e.preventDefault();
            e.stopPropagation();

            if (e.key === " " || e.key === "Enter") {
                action();
            }
        }
    };

    if (props.render === "link") {
        return (
            <a
                {...commonProps}
                role={prepareRole(props.role)}
                className={classNames("widget-sidebar-toggle", "mx-link", props.className)}
                {...events}
            >
                {icon}
                {props.caption}
            </a>
        );
    }
    return (
        <button
            {...commonProps}
            className={classNames("widget-sidebar-toggle", "btn mx-button toggle-btn", props.className)}
            {...events}
        >
            {icon}
            {props.caption}
        </button>
    );
}
