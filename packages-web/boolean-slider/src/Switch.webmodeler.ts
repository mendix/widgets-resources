import { Component, createElement } from "react";
import { Switch } from "./components/Switch";
import SwitchContainer, { SwitchContainerProps } from "./components/SwitchContainer";

import * as css from "./ui/Switch.scss";
import { Label } from "./components/Label";

// tslint:disable class-name
export class preview extends Component<SwitchContainerProps, {}> {
    componentWillMount() {
        this.addPreviewStyle("widget-switch");
    }

    render() {
        const maxLabelWidth = 11;
        if (this.props.label.trim()) {
            return createElement(Label, {
                className: this.props.class,
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

    private addPreviewStyle(styleId: string) {
        // This workaround is to load style in the preview temporary till mendix has a better solution
        const iFrame = document.getElementsByClassName("t-page-editor-iframe")[0] as HTMLIFrameElement;
        const iFrameDoc = iFrame.contentDocument;
        if (!iFrameDoc.getElementById(styleId)) {
            const styleTarget = iFrameDoc.head || iFrameDoc.getElementsByTagName("head")[0];
            const styleElement = document.createElement("style");
            styleElement.setAttribute("type", "text/css");
            styleElement.setAttribute("id", styleId);
            styleElement.appendChild(document.createTextNode(css));
            styleTarget.appendChild(styleElement);
        }
    }
}
