import { Component, createElement } from "react";
import { Alert } from "./Alert";
import { StarRating } from "./StarRating";

interface StarRatingContainerProps {
    // Properties from Mendix modeler
    rateAttribute: string;
    campaignEntity: string;
    rateEntity: string;
    rateType: "average" | "rating";
    onChangeMicroflow: string;
    averageAttribute: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
}

class StarRatingContainer extends Component<StarRatingContainerProps, { alertMessage?: string, initialRate: number }> {
    private subscriptionHandles: number[];
    private ownerReference = "";

    constructor(props: StarRatingContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.ownerReference = "System.owner";
        this.state = { alertMessage: this.validateProps(), initialRate: 0 };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.subscribe(this.props.mxObject);
    }

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert, { message: this.state.alertMessage });
        } else {
            return createElement(StarRating, {
                handleOnChange: this.handleOnChange,
                initialRate: this.state.initialRate,
                ownerGuid: this.props.mxObject
                    ? this.props.mxObject.get(this.ownerReference) as string
                    : undefined,
                rateType: this.props.rateType,
                readOnly: this.props.readOnly
            });
        }
    }

    componentWillReceiveProps(nextProps: StarRatingContainerProps) {
        this.subscribe(nextProps.mxObject);
        this.fetchData(nextProps.mxObject);
    }

     componentDidMount() {
        if (!this.state.alertMessage) {
            this.fetchData(this.props.mxObject);
        }
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    private handleOnChange(rate: number) {
        const { mxObject, onChangeMicroflow, rateAttribute } = this.props;
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (mxObject) {
            mxObject.set(rateAttribute, rate);
            if (onChangeMicroflow) {
                window.mx.ui.action(onChangeMicroflow, {
                    context,
                    // tslint:disable-next-line:max-line-length
                    error: error => window.mx.ui.error(`Error while executing microflow: ${onChangeMicroflow}: ${error.message}`),
                    params: {
                        applyto: "selection",
                        guids: [ mxObject.getGuid() ]
                    }
                });
            }
        }
    }

    private validateProps(): string {
        const errorMessage: string[] = [];
        const { campaignEntity, mxObject, rateEntity, rateType } = this.props;
        if (mxObject) {
            if ((rateType === "average") && mxObject.getEntity() !== campaignEntity.split("/")[1]) {
                errorMessage.push(" - For rate type 'average', the contextObject should be campaign entity");
            }
            if ((rateType === "rating") && mxObject.getEntity() !== rateEntity) {
                errorMessage.push(` - For rate type 'Rating', the contextObject be rate entity '${rateEntity}'`);
            }
            if (rateType === "rating" && !mxObject.isReference(this.ownerReference)) {
                errorMessage.push(` - Context object has no User / Owner association to it`);
            }
            if (errorMessage.length) {
                errorMessage.unshift("Configuration Error: \n");
            }
        }
        return errorMessage.join("\n");
    }

    private subscribe(contextObject: mendix.lib.MxObject) {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.fetchData(contextObject),
                guid: contextObject.getGuid()
            }));

            [ this.props.averageAttribute, this.props.rateAttribute ].forEach( attribute =>
                this.subscriptionHandles.push( window.mx.data.subscribe({
                    attr: attribute,
                    callback: () => this.fetchData(contextObject),
                    guid: contextObject.getGuid()
                }))
            );
        }
    }

    private unSubscribe() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private fetchData(contextObject: mendix.lib.MxObject) {
        this.setState({
            initialRate: contextObject
                ? this.props.rateType === "average"
                    ? contextObject.get(this.props.averageAttribute) as number
                    : contextObject.get(this.props.rateAttribute) as number
                : 0
        });
    }
}

export { StarRatingContainer as default, StarRatingContainerProps };
