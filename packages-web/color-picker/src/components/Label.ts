import { SFC, createElement } from "react";
import * as classNames from "classnames";

export interface LabelProps {
    className?: string;
    label: string;
    weight: number;
    style?: object;
    orientation?: "horizontal" | "vertical";
}

export const Label: SFC<LabelProps> = ({ children, className, label, style, weight, orientation }) => {
    weight = weight > 11 ? 3 : weight;
    const labelWeight = orientation === "horizontal" ? `col-sm-${weight}` : "";
    const childrenWeight = orientation === "horizontal" ? `col-sm-${12 - weight}` : "";

    return createElement("div", { className: classNames("form-group", className), style },
        createElement("label", { className: `control-label ${labelWeight}` }, label),
        createElement("div", { className: `${childrenWeight}` }, children)
    );
};

Label.defaultProps = { weight: 6 };

Label.displayName = "Label";
