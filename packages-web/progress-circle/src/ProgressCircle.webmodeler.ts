import { Component, DOM, createElement } from "react";
import { Alert } from "./components/Alert";
import { ProgressCircle, ProgressCircleProps } from "./components/ProgressCircle";
import ProgressCircleContainer, { ContainerProps } from "./components/ProgressCircleContainer";

import * as css from "./ui/ProgressCircle.scss";

// tslint:disable-next-line:class-name
export class preview extends Component<ContainerProps, {}> {
    componentWillMount() {
        this.addPreviewStyle("widget-progress-circle-style");
    }

    render() {
        const warnings = ProgressCircleContainer.validateProps(this.props);
        if (!warnings) {
            return createElement(ProgressCircle, this.transformProps(this.props));
        } else {
            return DOM.div({},
                createElement(Alert, { message: warnings }),
                createElement(ProgressCircle, this.transformProps(this.props))
            );
        }

    }

    private transformProps(props: ContainerProps): ProgressCircleProps {
        return {
            circleThickness: props.circleThickness,
            className: props.class,
            clickable: false,
            positiveValueColor: props.positiveValueColor,
            style: ProgressCircleContainer.parseStyle(props.style),
            textSize: props.textSize,
            value: 67
        };
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
