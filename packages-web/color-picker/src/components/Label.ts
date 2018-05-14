import { SFC, createElement } from "react";
import * as classNames from "classnames";

interface LabelProps {
    label: string;
    weight: number;
}

const Label: SFC<LabelProps> = ({ children, label, weight }) =>
    createElement("div", { className: "widget-color-picker-label form-group" },
        createElement("div", { className: `col-sm-${weight} col-xs-${weight}` },
            createElement("label", { className: "control-label" }, label)
        ),
        createElement("div", {
            className: `col-sm-${12 - weight} col-xs-${12 - weight}`
        }, children)
    );

Label.defaultProps = {
    weight: 6
};

Label.displayName = "Label";

export { Label, LabelProps };
