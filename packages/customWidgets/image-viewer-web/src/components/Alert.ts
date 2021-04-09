import { createElement, FunctionComponent } from "react";
import classNames from "classnames";

type bootstrapStyle = "danger" | "info" | "success" | "inverse" | "warning";

export interface AlertProps {
    bootstrapStyle?: bootstrapStyle;
    message?: string;
    className?: string;
}

export const Alert: FunctionComponent<AlertProps> = props =>
    props.children
        ? createElement(
              "div",
              { className: classNames(`alert alert-${props.bootstrapStyle}`, props.className) },
              props.children
          )
        : null;

Alert.displayName = "Alert";

Alert.defaultProps = {
    bootstrapStyle: "danger"
};
