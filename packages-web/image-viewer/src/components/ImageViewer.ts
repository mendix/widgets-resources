import { Component, DOM, createElement } from "react";

import * as Lightbox from "react-images";

import "../ui/ImageViewer.css";

interface ImageViewerProps {
    imageurl: string;
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
        return DOM.div({ className: "widget-image-viewer" },
            DOM.img({
                onClick: this.openLightBox,
                src: this.props.imageurl
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
}

export { ImageViewer, ImageViewerProps };
