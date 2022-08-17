import { ReactElement, createElement, ReactNode } from "react";
import { PopConpemnet, PopConpemnetProps } from "./PopConpemnet";
import { ButtonConpemnet, ButtonConpemnetProps } from "./ButtonConpemnet";

export interface ButtonWebProps extends ButtonConpemnetProps, PopConpemnetProps {
    children: ReactNode;
    openconfirm?: boolean;
    confirmType?: "pop" | "modal";
}
// ButtonConpemnet
export function Button(props: ButtonWebProps): ReactElement {
    const {
        block,
        href,
        ghost,
        loading,
        danger,
        disabled,
        size,
        icon,
        shape,
        type,
        children,
        openconfirm, // Open the confirmation pop-up window before executing microflow
        confirmType,
        confirmtitle,
        confirmokText,
        onClick,
        onConfirm,
        onCancel,
        confirmcancelText,
        confirmokType
    } = props;

    const ButtonWebView = (
        <ButtonConpemnet
            disabled={disabled}
            danger={danger}
            loading={loading}
            ghost={ghost}
            block={block}
            href={href}
            size={size}
            shape={shape}
            type={type}
            onClick={onClick}
            icon={icon}
        >
            {children}
        </ButtonConpemnet>
    );
    return (
        <div>
            {openconfirm && confirmType === "pop" ? (
                <PopConpemnet
                    confirmtitle={confirmtitle}
                    confirmokText={confirmokText}
                    confirmcancelText={confirmcancelText}
                    confirmokType={confirmokType}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                >
                    {ButtonWebView}
                </PopConpemnet>
            ) : (
                ButtonWebView
            )}
        </div>
    );
}
