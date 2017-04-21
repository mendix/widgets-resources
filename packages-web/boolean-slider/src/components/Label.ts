import { DOM, SFC } from "react";
import * as classNames from "classnames";

interface LabelProps {
    className?: string;
    label: string;
    orientation?: LabelOrientation;
    style?: object;
    weight: number;
}

type LabelOrientation = "horizontal" | "vertical";

const Label: SFC<LabelProps> = ({ children, className, label, orientation, style, weight }) =>
    DOM.div({ className: classNames("form-group", className), style },
        DOM.label({
            className: classNames("control-label", {
                [`col-sm-${weight}`]: orientation === "horizontal"
            })
        }, label),
        DOM.div({
            className: classNames({
                [`col-sm-${12 - weight}`]: orientation === "horizontal"
            })
        }, children)
    );

Label.defaultProps = {
    orientation: "horizontal",
    weight: 6
};

Label.displayName = "Label";

export { Label, LabelProps, LabelOrientation };
