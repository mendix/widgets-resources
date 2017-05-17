import { Component, createElement } from "react";
import { StarRating } from "./components/StarRating";
import StarRatingContainer, { ContainerProps } from "./components/StarRatingContainer";

import * as css from "./ui/StarRating.css";

// tslint:disable class-name
export class preview extends Component<ContainerProps, {}> {
    componentWillMount() {
        this.addPreviewStyle("widget-StarRating");
    }

    render() {
        const { mxObject } = this.props;
        const readOnly = this.props.editable === "never"
            || (mxObject && mxObject.isReadonlyAttr(this.props.rateAttribute)) || this.props.readOnly || !mxObject;

        return createElement(StarRating, {
            className: this.props.class,
            initialRate: 1,
            readOnly,
            maximumStars: this.props.maximumStars,
            style: StarRatingContainer.parseStyle(this.props.style)
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
