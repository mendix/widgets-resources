import { Component, createElement } from "react";
import { Switch } from "./components/Switch";
import { SwitchContainerProps } from "./components/SwitchContainer";

import * as css from "./ui/Switch.sass";

interface PreviewState {
    isChecked: boolean;
}
// tslint:disable class-name
export class preview extends Component<SwitchContainerProps, PreviewState> {
    constructor(props: SwitchContainerProps) {
        super(props);

        this.state = {
            isChecked: true
        };
        this.toggleChecked = this.toggleChecked.bind(this);
    }
    componentWillMount() {
        this.addPreviewStyle("widget-switch");
    }

    render() {
        return createElement(Switch, {
            bootstrapStyle: this.props.bootstrapStyle,
            isChecked: this.state.isChecked,
            onClick: this.toggleChecked,
            status: this.props.editable === "default" ? "enabled" : "disabled"
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

    private toggleChecked() {
        this.setState({ isChecked: !this.state.isChecked });
    }
}
