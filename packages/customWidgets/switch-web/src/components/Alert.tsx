import { FunctionComponent, createElement } from "react";

export interface AlertProps {
    message?: string;
}

export const Alert: FunctionComponent<AlertProps> = ({ message }) =>
    message ? <div className={"alert alert-danger"}>{message}</div> : null;

Alert.displayName = "Alert";
