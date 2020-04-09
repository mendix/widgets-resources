import { Component, createElement, ReactNode } from "react";
import { findDOMNode } from "react-dom";

import { Carousel, Image, Nanoflow, PageLocation } from "./Carousel";
import { Alert } from "./Alert";
import { UrlHelper } from "../UrlHelper";

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

export interface CarouselContainerProps extends WrapperProps {
    dataSource: DataSource;
    dataSourceMicroflow: string;
    entityConstraint: string;
    imagesEntity: string;
    urlAttribute: string;
    onClickOptions: ClickOptions;
    onClickMicroflow: string;
    onClickNanoflow: Nanoflow;
    onClickForm: string;
    openPageAs: PageLocation;
    staticImages: Image[];
}

interface CarouselContainerState {
    alertMessage?: string;
    images: Image[];
    isLoading?: boolean;
    showAlert?: boolean;
}

type DataSource = "static" | "XPath" | "microflow";
type ClickOptions = "doNothing" | "callMicroflow" | "callNanoflow" | "showPage";

export default class CarouselContainer extends Component<CarouselContainerProps, CarouselContainerState> {
    private subscriptionHandle: number;
    private xpathUrl: string;
    private subscriptionCallback: (mxObject: mendix.lib.MxObject) => () => void;
    private widgetId?: string;

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
        this.onParseStyleError = this.onParseStyleError.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.resetSubscription(props.mxObject);
    }

    render(): ReactNode {
        if (this.state.showAlert) {
            return createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-carousel-alert",
                message: this.state.alertMessage
            });
        }
        if (this.state.isLoading) {
            return createElement(
                "div",
                {},
                createElement("i", { className: "glyphicon glyphicon-cog glyph-spin" }),
                createElement("span", {}, " Loading ...")
            );
        }

        return createElement(Carousel, {
            alertMessage: this.state.alertMessage,
            className: this.props.class,
            images: this.state.images,
            onClickAction: this.executeAction,
            style: CarouselContainer.parseStyle(this.props.style, this.onParseStyleError)
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps: CarouselContainerProps): void {
        if (!this.widgetId) {
            const domNode: any = findDOMNode(this);
            this.widgetId = domNode.getAttribute("widgetId") || undefined;
        }
        this.resetSubscription(nextProps.mxObject);
        this.setState({ isLoading: true });
        this.fetchData(nextProps.mxObject);
    }

    componentDidUpdate(): void {
        if (this.widgetId) {
            const domNode: any = findDOMNode(this);
            domNode.setAttribute("widgetId", this.widgetId);
        }
    }

    componentWillUnmount(): void {
        if (this.subscriptionHandle) {
            window.mx.data.unsubscribe(this.subscriptionHandle);
        }
    }

    private resetSubscription(mxObject?: mendix.lib.MxObject): void {
        if (this.subscriptionHandle) {
            window.mx.data.unsubscribe(this.subscriptionHandle);
        }

        if (mxObject) {
            this.subscriptionHandle = window.mx.data.subscribe({
                callback: this.subscriptionCallback(mxObject),
                guid: mxObject.getGuid()
            });
        }
    }

    private fetchData(mxObject?: mendix.lib.MxObject): void {
        if (this.props.dataSource === "static") {
            const images = this.props.staticImages.map(image => {
                image.url = UrlHelper.getStaticResourceUrl(image.url);
                return image;
            });
            this.setState({ images, isLoading: false });
        } else if (this.props.dataSource === "XPath" && this.props.imagesEntity && mxObject) {
            this.fetchImagesByXPath(mxObject);
        } else if (this.props.dataSource === "microflow" && this.props.dataSourceMicroflow) {
            this.fetchImagesByMicroflow(this.props.dataSourceMicroflow, mxObject);
        }
    }

    private fetchImagesByXPath(mxObject: mendix.lib.MxObject): void {
        const { entityConstraint } = this.props;
        const requiresContext = entityConstraint && entityConstraint.indexOf("[%CurrentObject%]") > -1;
        const contextGuid = mxObject.getGuid();
        if (!contextGuid && requiresContext) {
            this.setState({ images: [], isLoading: false });
            return;
        }

        const constraint = entityConstraint ? entityConstraint.replace(/\[%CurrentObject%]/g, contextGuid) : "";

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

    private fetchImagesByMicroflow(microflow: string, mxObject?: mendix.lib.MxObject): void {
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
                    guids: mxObject ? [mxObject.getGuid()] : []
                }
            });
        }
    }

    private setImagesFromMxObjects(mxObjects: mendix.lib.MxObject[]): void {
        mxObjects = mxObjects || [];
        const imagesPromises = mxObjects.map(
            mxObject =>
                new Promise((resolve, reject) => {
                    if (this.props.urlAttribute) {
                        resolve(this.getImageProps(mxObject, mxObject.get(this.props.urlAttribute) as string));
                    } else {
                        const docURL = mx.data.getDocumentUrl(
                            mxObject.getGuid(),
                            mxObject.get("changedDate") as number
                        );
                        mx.data.getImageUrl(
                            docURL,
                            objectUrl => {
                                resolve(this.getImageProps(mxObject, objectUrl));
                            },
                            error => {
                                // eslint-disable-next-line prefer-promise-reject-errors
                                reject(`Error in carousel while retrieving image url: ${error.message}`);
                            }
                        );
                    }
                })
        );

        Promise.all(imagesPromises).then((images: Image[]) => {
            this.setState({ images, isLoading: false });
        });
    }

    private getImageProps(mxObject: mendix.lib.MxObject, url: string): any {
        const { onClickOptions, onClickForm, onClickMicroflow, onClickNanoflow, openPageAs } = this.props;

        return {
            guid: mxObject.getGuid(),
            onClickForm: onClickOptions === "showPage" ? onClickForm : undefined,
            onClickMicroflow: onClickOptions === "callMicroflow" ? onClickMicroflow : undefined,
            onClickNanoflow: onClickOptions === "callNanoflow" ? onClickNanoflow : undefined,
            openPageAs,
            url
        };
    }

    private getUrl(url: string): string {
        mx.data.getImageUrl(
            url,
            objectUrl => {
                this.xpathUrl = objectUrl;
            },
            error =>
                this.setState({
                    alertMessage: `Error in imageviewer while retrieving image url: ${error.message}`
                })
        );

        return this.xpathUrl;
    }

    private executeAction(image: Image): void {
        const context = this.getContext(image);

        if (image.onClickMicroflow) {
            window.mx.ui.action(image.onClickMicroflow, {
                context,
                origin: this.props.mxform,
                error: error =>
                    window.mx.ui.error(
                        `An error occurred while executing action ${image.onClickMicroflow} : ${error.message}`
                    )
            });
        } else if (image.onClickNanoflow && image.onClickNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: image.onClickNanoflow,
                context,
                origin: this.props.mxform,
                error: error => mx.ui.error(`An error occurred while executing the on click nanoflow: ${error.message}`)
            });
        } else if (image.onClickForm) {
            window.mx.ui.openForm(image.onClickForm, {
                location: image.openPageAs,
                context,
                error: error =>
                    window.mx.ui.error(`An error occurred while opening form ${image.onClickForm} : ${error.message}`)
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

    private onParseStyleError(error: string): void {
        this.setState({ alertMessage: error });
    }

    static validateProps(props: CarouselContainerProps): string {
        let message = "";
        if (props.dataSource === "static" && !props.staticImages.length) {
            message = "For the data source option 'Static', at least one static image should be added";
        }
        if (props.dataSource === "XPath" && !props.imagesEntity) {
            message = "For the data source 'XPath', the images entity is required";
        }
        if (props.dataSource === "microflow" && !props.dataSourceMicroflow) {
            message = "For data source option 'microflow', a data source microflow is required";
        }

        return message;
    }

    static parseStyle(style = "", onError: (error: string) => void): { [key: string]: string } {
        try {
            return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }
                return styleObject;
            }, {});
        } catch (error) {
            onError(`Failed to parse style ${style}: ${error}`);
        }

        return {};
    }
}
