import { ReactNode, ReactElement, createElement, MouseEvent } from "react";
import { Popconfirm } from "antd";
import { ConfirmokTypeEnum } from "../../typings/ButtonWebProps";

export interface PopConpemnetProps {
    confirmtitle?: string;
    confirmokText?: string;
    confirmcancelText?: string;
    confirmokType?: ConfirmokTypeEnum | undefined;
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
            title={props.confirmtitle}
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
