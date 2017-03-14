import { DOM, StatelessComponent } from "react";

interface LabelProps {
    className?: string;
    label: string;
    weight: number;
    orientation?: "horizontal" | "vertical";
}

const Label: StatelessComponent<LabelProps> = (props) =>
    DOM.div({ className: "form-group" },
        DOM.label({ className: `control-label col-sm-${props.weight}` }, props.label),
        DOM.div({ className: `col-sm-${12 - props.weight}` }, props.children)
    );

Label.defaultProps = {
    orientation: "horizontal",
    weight: 6
};

export { Label, LabelProps };
