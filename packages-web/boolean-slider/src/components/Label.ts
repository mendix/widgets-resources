import { DOM, SFC } from "react";
import * as classNames from "classnames";

interface LabelProps {
    className?: string;
    label: string;
    style?: object;
    weight: number;
}

const Label: SFC<LabelProps> = ({ children, className, label, style, weight }) =>
    DOM.div({ className: classNames("form-horizontal", className), style },
        DOM.div({ className: "form-group" },
            DOM.div({ className: `col-sm-${weight} col-xs-${weight}` },
                DOM.label({ className: "control-label" }, label)
            ),
            DOM.div({
                className: `col-sm-${12 - weight} col-xs-${12 - weight}`
            }, children)
        )
    );

Label.defaultProps = {
    weight: 6
};

Label.displayName = "Label";

export { Label, LabelProps };
