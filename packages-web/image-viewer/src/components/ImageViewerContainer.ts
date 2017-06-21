import { Component, createElement } from "react";

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
    openFullScreen: boolean;
    responsive: boolean;
}

interface ImageViewerContainerState {
    alertMessage?: string;
    imageUrl: string;
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
            imageUrl: ""
        };
        this.attributeCallback = mxObject => () => this.getImageUrl(mxObject);
    }

    render() {
        const { height, heightUnit, width, widthUnit, openFullScreen, responsive } = this.props;
        const { imageUrl } = this.state;
        if (this.state.alertMessage) {
            return createElement(Alert, { message: this.state.alertMessage });
        }

        return createElement(ImageViewer, {
            className: this.props.class,
            height,
            heightUnit,
            imageUrl,
            openFullScreen,
            responsive,
            style: ImageViewerContainer.parseStyle(this.props.style),
            width,
            widthUnit
        });
    }

    componentWillReceiveProps(newProps: ImageViewerContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.getImageUrl(newProps.mxObject);
    }

    componentWillUnmount() {
        if (this.subscriptionHandle) {
            window.mx.data.unsubscribe(this.subscriptionHandle);
        }
    }

    public static parseStyle(style = ""): {[key: string]: string} {
        try {
            return style.split(";").reduce<{[key: string]: string}>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }
                return styleObject;
            }, {});
        } catch (error) {
            // tslint:disable-next-line no-console
            console.log("Failed to parse style", style, error);
        }

        return {};
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
            this.setState({ imageUrl: mxObject.get(this.props.dynamicUrlAttribute) as string });
        }
        if (mxObject && this.props.source === "systemImage") {
            this.setState({
                imageUrl: UrlHelper.getDynamicResourceUrl(mxObject.getGuid(), mxObject.get("changedDate") as number)
            });
        }
        if (!mxObject && (this.props.source === "systemImage" || this.props.source === "urlAttribute")) {
            this.setState({ imageUrl: "" });
        }
        if (this.props.source === "staticUrl") {
            this.setState({ imageUrl: this.props.urlStatic });
        }
        if (this.props.source === "staticImage") {
            this.setState({ imageUrl: UrlHelper.getStaticResourceUrl(this.props.imageStatic) });
        }
    }
}

export { ImageViewerContainer as default, ImageViewerContainerProps, Units };
