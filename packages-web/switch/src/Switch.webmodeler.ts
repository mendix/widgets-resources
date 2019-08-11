import { Component, ReactNode, createElement } from "react";
import classNames from "classnames";

import { Switch } from "./components/Switch";
import SwitchContainer, { SwitchContainerProps } from "./components/SwitchContainer";

import { Label } from "./components/Label";

declare function require(name: string): string;

// tslint:disable class-name
export class preview extends Component<SwitchContainerProps, {}> {
    render(): ReactNode {
        const maxLabelWidth = 11;
        if (this.props.label.trim()) {
            return createElement(
                Label,
                {
                    className: classNames(this.props.class, this.props.deviceStyle),
                    label: this.props.label,
                    style: SwitchContainer.parseStyle(this.props.style),
                    weight: this.props.labelWidth > maxLabelWidth ? maxLabelWidth : this.props.labelWidth
                },
                this.renderSwitch(true)
            );
        } else {
            return this.renderSwitch();
        }
    }

    private renderSwitch(hasLabel = false): ReactNode {
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

export function getPreviewCss(): string {
    return require("./ui/Switch.scss");
}
