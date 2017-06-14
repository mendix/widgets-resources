import { Component, createElement } from "react";

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
    systemImageimageAttribute: string;
    imageAttribute: string;
    static_Url: string;
    static_Image: string;
    width: number;
    widthUnit: Units;
    height: number;
    heightUnit: Units;
}

interface ImageViewerContainerState {
    imageUrl: string;
}

type DataSource = "systemImage" | "imageUrlAttribute" | "staticUrl" | "staticImage";
type Units = "auto" | "pixels" | "percentage";

class ImageViewerContainer extends Component<ImageViewerContainerProps, ImageViewerContainerState> {
    private subscriptionHandle: number;
    private attributeCallback: (mxObject: mendix.lib.MxObject) => () => void;

    constructor(props: ImageViewerContainerProps) {
        super(props);

        this.state = { imageUrl: "" };
        this.attributeCallback = mxObject => () => this.getImageUrl(mxObject);
    }

    render() {

        return createElement(ImageViewer, {
            imageurl: this.state.imageUrl
        });
    }

    componentWillReceiveProps(newProps: ImageViewerContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.getImageUrl(newProps.mxObject);
    }

    componentWillUnmount() {
        if (this.subscriptionHandle) window.mx.data.unsubscribe(this.subscriptionHandle);
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        if (this.subscriptionHandle) window.mx.data.unsubscribe(this.subscriptionHandle);

        if (mxObject) {
            this.subscriptionHandle = window.mx.data.subscribe({
                callback: this.attributeCallback(mxObject),
                guid: mxObject.getGuid()
            });
        }
    }

    // tslint:disable-next-line:max-line-length
    private getImageUrl(mxObject?: mendix.lib.MxObject) {
        if (mxObject && this.props.source === "imageUrlAttribute") {
            this.setState({
                imageUrl: mxObject.get(this.props.imageAttribute) as string
            });
        }
        if (mxObject && this.props.source === "systemImage") {
            this.setState({
                imageUrl: UrlHelper.getDynamicResourceUrl(mxObject.getGuid(), mxObject.get("changedDate") as number)
            });
        }
        if (this.props.source === "staticUrl") {
            this.setState({ imageUrl: this.props.static_Url });
        }
        if (this.props.source === "staticImage") {
            this.setState({
                imageUrl: UrlHelper.getStaticResourceUrl(this.props.static_Image)
            });
        }
    }
}

export { ImageViewerContainer as default, ImageViewerContainerProps };
