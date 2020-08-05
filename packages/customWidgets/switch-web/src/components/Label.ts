import { SFC, createElement } from "react";
import classNames from "classnames";

interface LabelProps {
    className?: string;
    label: string;
    labelId?: string;
    style?: object;
    weight: number;
}

const Label: SFC<LabelProps> = ({ children, className, label, labelId, style, weight }) =>
    createElement(
        "div",
        { className: classNames("widget-switch-label", className), style },
        createElement(
            "div",
            { className: "form-group clearfix" },
            createElement(
                "div",
                { className: `col-sm-${weight} col-xs-${weight}` },
                createElement("label", { id: labelId, className: "control-label" }, label)
            ),
            createElement(
                "div",
                {
                    className: `col-sm-${12 - weight} col-xs-${12 - weight}`
                },
                children
            )
        )
    );

Label.defaultProps = {
    weight: 6
};

Label.displayName = "Label";

export { Label, LabelProps };
