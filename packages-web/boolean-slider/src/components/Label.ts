import { DOM, SFC } from "react";
import * as classNames from "classnames";

interface LabelProps {
    label: string;
    weight: number;
    orientation?: LabelOrientation;
}

type LabelOrientation = "horizontal" | "vertical";

const Label: SFC<LabelProps> = ({ children, label, orientation, weight }) =>
    DOM.div({ className: "form-group" },
        DOM.label({
            className: classNames("control-label", {
                [`col-sm-${weight} col-xs-${weight}`]: orientation === "horizontal"
            })
        }, label),
        DOM.div({
            className: classNames({
                [`col-sm-${12 - weight} col-xs-${12 - weight}`]: orientation === "horizontal"
            })
        }, children)
    );

Label.defaultProps = {
    orientation: "horizontal",
    weight: 6
};

Label.displayName = "Label";

export { Label, LabelProps, LabelOrientation };
