import { Component, createElement } from "react";
import * as classNames from "classnames";

import { Switch } from "./components/Switch";
import SwitchContainer, { SwitchContainerProps } from "./components/SwitchContainer";

import { Label } from "./components/Label";

// tslint:disable class-name
export class preview extends Component<SwitchContainerProps, {}> {
    render() {
        const maxLabelWidth = 11;
        if (this.props.label.trim()) {
            return createElement(Label, {
                className: classNames(this.props.class, this.props.deviceStyle),
                label: this.props.label,
                style: SwitchContainer.parseStyle(this.props.style),
                weight: this.props.labelWidth > maxLabelWidth ? maxLabelWidth : this.props.labelWidth
            }, this.renderSwitch(true));
        }

        return this.renderSwitch();
    }

    private renderSwitch(hasLabel = false) {
        return createElement(Switch, {
            className: !hasLabel ? this.props.class : undefined,
            colorStyle: this.props.colorStyle,
            deviceStyle: this.props.deviceStyle,
            isChecked: true,
            onClick: undefined as any,
            status: this.props.editable === "default" ? "enabled" : "disabled",
            style: !hasLabel ? SwitchContainer.parseStyle(this.props.style) : undefined
        });
    }
}

export function getPreviewCss() {
    return require("./ui/Switch.scss");
}
