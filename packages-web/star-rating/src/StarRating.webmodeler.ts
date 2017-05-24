import { Component, createElement } from "react";
import { StarRating } from "./components/StarRating";
import StarRatingContainer, { ContainerProps, widgetColors } from "./components/StarRatingContainer";

import * as css from "./ui/StarRating.scss";

// tslint:disable class-name
export class preview extends Component<ContainerProps, {}> {
    componentWillMount() {
        this.addPreviewStyle("widget-StarRating");
    }

    render() {
        return createElement(StarRating, {
            className: this.props.class,
            initialRate: 1,
            maximumStars: this.props.maximumStars,
            readOnly: true,
            style: StarRatingContainer.parseStyle(this.props.style),
            widgetColor: this.props.widgetColor
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
