import { ReactElement, createElement } from "react";

import { Button, ButtonProps } from "antd";

import { Icon } from "./Icon";
import { WebIcon } from "mendix";

export type ConfirmokTypeEnum = "primary" | "ghost" | "dashed" | "link" | "text" | "default";

export interface ButtonConpemnetProps extends ButtonProps {
    icon: WebIcon;
}

// ButtonConpemnet
export function ButtonConpemnet(props: ButtonConpemnetProps): ReactElement {
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
