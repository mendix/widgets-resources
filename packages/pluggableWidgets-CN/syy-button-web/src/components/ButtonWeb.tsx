import { ReactNode, ReactElement, createElement, MouseEvent } from "react";

import { Button, Popconfirm, ButtonProps } from "antd";
// import Button from "antd/lib/button";
// import Popconfirm from "antd/lib/popconfirm";
// import { ButtonProps } from "antd/lib/button/button";

import { Icon } from "./Icon";
import { DynamicValue, WebIcon } from "mendix";

export type ConfirmokTypeEnum = "primary" | "ghost" | "dashed" | "link" | "text" | "default";

export interface ButtonWebProps extends ButtonProps {
    icon: WebIcon;
}

export interface PopConpemnetProps {
    confirmtitle?: DynamicValue<string>;
    confirmokText: string;
    confirmcancelText: string;
    confirmokType: ConfirmokTypeEnum;
    onConfirm?: (event: MouseEvent<HTMLDivElement>) => void;
    onCancel?: (event: MouseEvent<HTMLDivElement>) => void;
    onClickAction?: (event: MouseEvent<HTMLDivElement>) => void;
    children: ReactNode;
}

// confirmation pop-up
export function PopConpemnet(props: PopConpemnetProps): ReactElement {
    return (
        <Popconfirm
            style={{ padding: 0, backgroundColor: "red" }}
            title={props.confirmtitle?.value}
            okText={props.confirmokText}
            okType={props.confirmokType}
            cancelText={props.confirmcancelText}
            onConfirm={props.onConfirm}
            onCancel={props.onCancel}
        >
            {props.children}
        </Popconfirm>
    );
}

// ButtonConpemnet
export function ButtonConpemnet(props: ButtonWebProps): ReactElement {
    const { block, href, ghost, loading, danger, disabled, size, icon, shape, type, children, onClick } = props;
    return (
        <Button
            disabled={disabled}
            danger={danger}
            loading={loading}
            ghost={ghost}
            block={block}
            href={href ? href : undefined}
            size={size}
            shape={shape}
            type={type}
            onClick={onClick}
        >
            {icon ? <Icon data={icon} empty /> : ""}
            {children}
        </Button>
    );
}
