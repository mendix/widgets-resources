import { Component, DOM, createElement } from "react";

import { Alert } from "./Alert";
import { ImageViewer } from "./ImageViewer";
import { UrlHelper } from "../UrlHelper";

interface WrapperProps {
    class: string;
    mxObject?: mendix.lib.MxObject;
    style: string;
    readOnly: boolean;
}

interface ImageViewerContainerProps extends WrapperProps {
    source: DataSource;
    dynamicUrlAttribute: string;
    urlStatic: string;
    imageStatic: string;
    width: number;
    widthUnit: Units;
    height: number;
    heightUnit: Units;
}

interface ImageViewerContainerState {
    alertMessage?: string;
    imageUrl: string;
    isLoading?: boolean;
}

type DataSource = "systemImage" | "urlAttribute" | "staticUrl" | "staticImage";
type Units = "auto" | "pixels" | "percentage";

class ImageViewerContainer extends Component<ImageViewerContainerProps, ImageViewerContainerState> {
    private subscriptionHandle: number;
    private attributeCallback: (mxObject: mendix.lib.MxObject) => () => void;

    constructor(props: ImageViewerContainerProps) {
        super(props);

        const alertMessage = ImageViewerContainer.validateProps(props);
        this.state = {
            alertMessage,
            imageUrl: "",
            isLoading: true
        };
        this.attributeCallback = mxObject => () => this.getImageUrl(mxObject);
    }

    render() {
        const { height, heightUnit, width, widthUnit } = this.props;
        const { imageUrl } = this.state;
        if (this.state.alertMessage) {
            return createElement(Alert, { message: this.state.alertMessage });
        }
        if (this.state.isLoading) {
            return DOM.div(null,
                DOM.i({ className: "glyphicon glyphicon-cog glyph-spin" }),
                DOM.span(null, " Loading ...")
            );
        }

        return createElement(ImageViewer, { height, heightUnit, imageUrl, width, widthUnit });
    }

    componentWillReceiveProps(newProps: ImageViewerContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState({ isLoading: true });
        this.getImageUrl(newProps.mxObject);
    }

    componentWillUnmount() {
        if (this.subscriptionHandle) {
            window.mx.data.unsubscribe(this.subscriptionHandle);
        }
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        if (this.subscriptionHandle) {
            window.mx.data.unsubscribe(this.subscriptionHandle);
        }

        if (mxObject) {
            this.subscriptionHandle = window.mx.data.subscribe({
                callback: this.attributeCallback(mxObject),
                guid: mxObject.getGuid()
            });
        }
    }

    public static validateProps(props: ImageViewerContainerProps): string {
        let message = "";
        if (props.source === "urlAttribute" && !props.dynamicUrlAttribute) {
            message = "Configuration error: for data source Dynamic URL; Dynamic URL attribute is required";
        }
        if (props.source === "staticUrl" && !props.urlStatic) {
            message = "Configuration error: for data source Static URL; a static url is required";
        }
        if (props.source === "staticImage" && !props.imageStatic) {
            message = "Configuration error: for data source Static Image; a static image is required";
        }

        return message;
    }

    private getImageUrl(mxObject?: mendix.lib.MxObject) {
        if (mxObject && this.props.source === "urlAttribute") {
            this.updateUrl(mxObject.get(this.props.dynamicUrlAttribute) as string);
        }
        if (mxObject && this.props.source === "systemImage") {
            this.updateUrl(UrlHelper.getDynamicResourceUrl(mxObject.getGuid(), mxObject.get("changedDate") as number));
        }
        if (!mxObject && (this.props.source === "systemImage" || this.props.source === "urlAttribute")) {
            this.updateUrl("");
        }
        if (this.props.source === "staticUrl") {
            this.updateUrl(this.props.urlStatic);
        }
        if (this.props.source === "staticImage") {
            this.updateUrl(UrlHelper.getStaticResourceUrl(this.props.imageStatic));
        }
    }

    private updateUrl(url: string) {
        this.setState({ imageUrl: url, isLoading: false });
    }
}

export { ImageViewerContainer as default, ImageViewerContainerProps, Units };
