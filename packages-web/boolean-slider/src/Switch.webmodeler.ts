import { Component, createElement } from "react";
import { Switch, SwitchProps } from "./components/Switch";

import * as css from "./ui/Switch.sass";

// tslint:disable class-name
export class preview extends Component<SwitchProps, {}> {
    componentWillMount() {
        this.addPreviewStyle("widget-switch");
    }

    render() {
        return createElement(Switch, {
            bootstrapStyle: "success",
            isChecked: true,
            onClick: () => console.log("Clicked"),
            status: "enabled"
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
