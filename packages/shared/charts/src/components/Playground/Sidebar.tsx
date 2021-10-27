import { createElement, ReactElement, ReactNode } from "react";
import classNames from "classnames";

import "../../ui/Sidebar.scss";
import "../../ui/Panel.scss";

import closeIconSvg from "../../assets/close.svg";

interface SidebarProps {
    children: ReactNode;
    className?: string;
    isOpen: boolean;
    onBlur?: () => void;
    onClick?: () => void;
}

export const Sidebar = ({ className, isOpen, onBlur, onClick, children }: SidebarProps): ReactElement => {
    return (
        <div
            className={classNames("widget-sidebar", className, {
                "widget-sidebar-open": isOpen
            })}
            onClick={onClick}
        >
            <div className="overlay" onClick={onBlur} />
            <div className="sidebar-content">{children}</div>
        </div>
    );
};

export interface SidebarHeaderProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    onClose?: () => void;
}

export const SidebarHeader = ({ className, onClose, children }: SidebarHeaderProps): ReactElement => {
    const contentSize = onClose ? 10 : 12;
    return (
        <div className={classNames("sidebar-content-header", className)}>
            <div className={`header-content col-sm-${contentSize} col-xs-${contentSize}`}>{children}</div>
            {onClose ? (
                <div className="col-sm-2 col-xs-2">
                    <button className="btn btn-image btn-icon close-button" onClick={onClose}>
                        <img src={closeIconSvg} className="removeIcon" alt="Close the playground sidebar" />
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export interface SidebarPanelProps {
    className?: string;
    heading?: string;
    headingClassName?: string;
    children: ReactNode;
}

export const SidebarPanel = ({ className, heading, headingClassName, children }: SidebarPanelProps): ReactElement => (
    <div className={classNames("widget-panel", className)}>
        {heading ? <div className={classNames("widget-panel-header", headingClassName)}>{heading}</div> : null}
        {children}
    </div>
);

export interface SidebarHeaderToolsProps {
    className?: string;
    children: ReactNode;
}

export const SidebarHeaderTools = ({ className, children }: SidebarHeaderToolsProps): ReactElement => (
    <div className={classNames("sidebar-header-tools", className)}>{children}</div>
);

export interface SelectProps {
    onChange: (value: string) => void;
    options: SelectOption[];
}

interface SelectOption {
    name: string;
    value: string | number;
    isDefaultSelected: boolean;
}

export const Select = ({ onChange, options }: SelectProps): ReactElement => {
    return (
        <select className="form-control" onChange={e => onChange(e.currentTarget.value)}>
            {options.map(option => (
                <option
                    key={`select-option-${option.value}`}
                    value={option.value}
                    defaultChecked={option.isDefaultSelected}
                >
                    {option.name}
                </option>
            ))}
        </select>
    );
};
