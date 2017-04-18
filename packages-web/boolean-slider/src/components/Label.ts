import { DOM, SFC } from "react";
import * as classNames from "classnames";

interface LabelProps {
    className?: string;
    label: string;
    weight: number;
    orientation?: LabelOrientation;
}

type LabelOrientation = "horizontal" | "vertical";

const Label: SFC<LabelProps> = (props) =>
    DOM.div({ className: "form-group" },
        DOM.label({
            className: classNames("control-label", { [`col-sm-${props.weight}`]: props.orientation === "horizontal" })
        }, props.label),
        DOM.div({
            className: classNames({ [`col-sm-${12 - props.weight}`]: props.orientation === "horizontal" })
        }, props.children)
    );

Label.defaultProps = {
    orientation: "horizontal",
    weight: 6
};

export { Label, LabelProps, LabelOrientation };
