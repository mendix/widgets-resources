import { Component, DOM, createElement } from "react";

import * as Lightbox from "react-images";

import { Units } from "./ImageViewerContainer";

import "../ui/ImageViewer.css";

interface ImageViewerProps {
    imageurl: string;
    height: number;
    heightUnits: Units;
    width: number;
    widthUnits: Units;
}

interface ImageViewerState {
    isOpen: boolean;
}

class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {

    constructor(props: ImageViewerProps) {
        super(props);

        this.state = {
            isOpen: false
        };
        this.openLightBox = this.openLightBox.bind(this);
        this.closeLightBox = this.closeLightBox.bind(this);
    }

    render() {
        const divStyle = {
            height: this.getStyle(this.props.height, this.props.heightUnits),
            width: this.getStyle(this.props.width, this.props.widthUnits)
        };
        const imageStyle = {
            height: this.getStyle(this.props.height, this.props.heightUnits, true),
            width: this.getStyle(this.props.width, this.props.widthUnits, true)
        };
        return DOM.div({ className: "widget-image-viewer", style: divStyle },
            DOM.img({
                onClick: this.openLightBox,
                src: this.props.imageurl,
                style: imageStyle
            }),
            createElement(Lightbox, {
                images: [ {
                    src: this.props.imageurl
                } ],
                isOpen: this.state.isOpen,
                onClose: this.closeLightBox,
                showImageCount: false
            })
        );
    }

    private openLightBox() {
        this.setState({
            isOpen: true
        });
    }

    private closeLightBox() {
        this.setState({
            isOpen: false
        });
    }

    private getStyle(value: string | number, type: string, isInner?: boolean): number | string {
        if (type === "pixels") {
            return value + "px";
        }
        if (isInner && type === "percentage") {
            return "100%";
        }
        if (type === "percentage") {
            return value + "%";
        }

        return "";
    }
}

export { ImageViewer, ImageViewerProps };
