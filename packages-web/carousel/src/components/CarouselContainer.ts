import { Component, DOM, createElement } from "react";
import { Carousel, Image } from "./Carousel";
import { Alert } from "./Alert";
import { UrlHelper } from "../UrlHelper";

interface WrapperProps {
    mxObject: mendix.lib.MxObject;
}

interface CarouselContainerProps extends WrapperProps {
    dataSource: DataSource;
    dataSourceMicroflow: string;
    entityConstraint: string;
    imagesEntity: string;
    urlAttribute: string;
    onClickOptions: ClickOptions;
    onClickMicroflow: string;
    onClickForm: string;
    staticImages: Image[];
}

interface CarouselContainerState {
    alertMessage?: string;
    images: Image[];
    isLoading?: boolean;
    showAlert?: boolean;
}

type DataSource = "static" | "XPath" | "microflow";
type ClickOptions = "doNothing" | "callMicroflow" | "showPage";

class CarouselContainer extends Component<CarouselContainerProps, CarouselContainerState> {
    private subscriptionHandle: number;
    private subscriptionCallback: (mxObject: mendix.lib.MxObject) => () => void;

    constructor(props: CarouselContainerProps) {
        super(props);

        const alertMessage = CarouselContainer.validateProps(props);
        this.state = {
            alertMessage,
            images: [],
            isLoading: true,
            showAlert: !!alertMessage
        };
        this.executeAction = this.executeAction.bind(this);
        this.subscriptionCallback = mxObject => () => this.fetchData(mxObject);
    }

    render() {
        if (this.state.showAlert) {
            return createElement(Alert, { message: this.state.alertMessage });
        }
        if (this.state.isLoading) {
            return DOM.div(null,
                DOM.i({ className: "glyphicon glyphicon-cog glyph-spin" }),
                DOM.span(null, " Loading ...")
            );
        }

        return createElement(Carousel, {
            alertMessage: this.state.alertMessage,
            images: this.state.images,
            onClickAction: this.executeAction
        });
    }

    componentWillReceiveProps(nextProps: CarouselContainerProps) {
        this.resetSubscription(nextProps.mxObject);
        this.setState({ isLoading: true });
        this.fetchData(nextProps.mxObject);
    }

    componentWillUnmount() {
        if (this.subscriptionHandle) window.mx.data.unsubscribe(this.subscriptionHandle);
    }

    public static validateProps(props: CarouselContainerProps): string {
        let message = "";
        if (props.dataSource === "static" && !props.staticImages.length) {
            message = "Configuration error: for data source static; at least one static image is required";
        }
        if (props.dataSource === "XPath" && !props.imagesEntity) {
            message = "Configuration error: for data source XPath; the images entity is required";
        }
        if (props.dataSource === "microflow" && !props.dataSourceMicroflow) {
            message = "Configuration error: for data source microflow; a data source microflow is required";
        }

        return message;
    }

    private resetSubscription(mxObject: mendix.lib.MxObject) {
        if (this.subscriptionHandle) window.mx.data.unsubscribe(this.subscriptionHandle);

        if (mxObject) {
            this.subscriptionHandle = window.mx.data.subscribe({
                callback: this.subscriptionCallback(mxObject),
                guid: mxObject.getGuid()
            });
        }

    }

    private fetchData(mxObject: mendix.lib.MxObject) {
        if (this.props.dataSource === "static") {
            const images = this.props.staticImages.map((image) => {
                image.url = UrlHelper.getStaticResourceUrl(image.url);
                return image;
            });
            this.setState({ images, isLoading: false });
        } else if (this.props.dataSource === "XPath" && this.props.imagesEntity) {
            this.fetchImagesByXPath(mxObject ? mxObject.getGuid() : "");
        } else if (this.props.dataSource === "microflow" && this.props.dataSourceMicroflow) {
            this.fetchImagesByMicroflow(this.props.dataSourceMicroflow, mxObject);
        }
    }

    private fetchImagesByXPath(contextGuid: string) {
        const { entityConstraint } = this.props;
        const requiresContext = entityConstraint && entityConstraint.indexOf("[%CurrentObject%]") > -1;
        if (!contextGuid && requiresContext) {
            this.setState({ images: [], isLoading: false });
            return;
        }

        const constraint = entityConstraint ? entityConstraint.replace("[%CurrentObject%]", contextGuid) : "";
        window.mx.data.get({
            callback: mxObjects => this.setImagesFromMxObjects(mxObjects),
            error: error =>
                this.setState({
                    alertMessage: `An error occurred while retrieving items via XPath (${entityConstraint}): ${error}`,
                    images: []
                }),
            xpath: `//${this.props.imagesEntity}${constraint}`
        });
    }

    private fetchImagesByMicroflow(microflow: string, mxObject?: mendix.lib.MxObject) {
        if (microflow) {
            window.mx.ui.action(microflow, {
                callback: (mxObjects: mendix.lib.MxObject[]) => this.setImagesFromMxObjects(mxObjects),
                error: error =>
                    this.setState({
                        alertMessage: `An error occurred while retrieving images via the microflow ${microflow}:
                            ${error.message}`,
                        images: []
                    }),
                params: {
                    applyto: "selection",
                    guids: mxObject ? [ mxObject.getGuid() ] : []
                }
            });
        }
    }

    private setImagesFromMxObjects(mxObjects: mendix.lib.MxObject[]) {
        mxObjects = mxObjects || [];
        const { onClickOptions, onClickForm, onClickMicroflow } = this.props;
        const images = mxObjects.map((mxObject) => ({
            guid: mxObject.getGuid(),
            onClickForm: onClickOptions === "showPage" ? onClickForm : undefined,
            onClickMicroflow: onClickOptions === "callMicroflow" ? onClickMicroflow : undefined,
            url: this.props.urlAttribute
                ? mxObject.get(this.props.urlAttribute) as string
                : UrlHelper.getDynamicResourceUrl(mxObject.getGuid(), mxObject.get("changedDate") as number)
        }));

        this.setState({ images, isLoading: false });
    }

    private executeAction(image: Image) {
        const context = this.getContext(image);
        if (image.onClickMicroflow) {
            window.mx.ui.action(image.onClickMicroflow, {
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing action ${image.onClickMicroflow} : ${error.message}`
                )
            });
        } else if (image.onClickForm) {
            window.mx.ui.openForm(image.onClickForm, {
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while opening form ${image.onClickForm} : ${error.message}`
                )
            });
        }
    }

    private getContext(image: Image): mendix.lib.MxContext {
        const context = new window.mendix.lib.MxContext();
        if (image.guid) {
            context.setContext(this.props.imagesEntity, image.guid);
        } else if (this.props.mxObject) {
            context.setContext(this.props.mxObject.getEntity(), this.props.mxObject.getGuid());
        }

        return context;
    }
}

export { CarouselContainer as default, CarouselContainerProps };
