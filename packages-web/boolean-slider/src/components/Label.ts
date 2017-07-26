import { SFC, createElement } from "react";
import * as classNames from "classnames";

interface LabelProps {
    className?: string;
    label: string;
    style?: object;
    weight: number;
}

const Label: SFC<LabelProps> = ({ children, className, label, style, weight }) =>
    createElement("div", { className: classNames("form-horizontal widget-switch-label", className), style },
        createElement("div", { className: "form-group" },
            createElement("div", { className: `col-sm-${weight} col-xs-${weight}` },
                createElement("label", { className: "control-label" }, label)
            ),
            createElement("div", {
                className: `col-sm-${12 - weight} col-xs-${12 - weight}`
            }, children)
        )
    );

Label.defaultProps = {
    weight: 6
};

Label.displayName = "Label";

export { Label, LabelProps };
