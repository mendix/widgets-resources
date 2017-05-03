import { Component, createElement } from "react";
import { Alert } from "./Alert";
import { StarRating } from "./StarRating";

interface ContainerProps {
    // Properties from Mendix modeler
    rateAttribute: string;
    onCommitMicroflow: string;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
}

class StarRatingInputContainer extends Component<ContainerProps, { alertMessage?: string, initialRate: number }> {
    private subscriptionHandles: number[];
    private ownerReference = "";

    constructor(props: ContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.ownerReference = "System.owner";
        this.state = { alertMessage: this.validateProps(props), initialRate: 0 };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.resetSubscription(this.props.mxObject);
    }

    render() {
        const ownerGuid = this.props.mxObject ? this.props.mxObject.get(this.ownerReference) as string : "";
        if (this.state.alertMessage) {
            return createElement(Alert, { message: this.state.alertMessage });
        } else {
            return createElement(StarRating, {
                fractions: 1,
                handleOnChange: this.handleOnChange,
                initialRate: this.state.initialRate,
                ownerGuid,
                readOnly: this.props.readOnly || !(ownerGuid === window.mx.session.getUserId())
            });
        }
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
        if (nextProps.mxObject) {
            const errorMessage = this.validateProps(nextProps);
            if (!errorMessage) {
                this.resetSubscription(nextProps.mxObject);
                this.fetchData(nextProps.mxObject);
            } else {
                this.setState({ alertMessage: errorMessage });
            }
        }
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    private handleOnChange(rate: number) {
        const { mxObject, onCommitMicroflow, rateAttribute } = this.props;
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (mxObject && onCommitMicroflow) {
            mxObject.set(rateAttribute, rate);
            window.mx.ui.action(onCommitMicroflow, {
                context,
                // tslint:disable-next-line:max-line-length
                error: error => window.mx.ui.error(`Error while executing microflow: ${onCommitMicroflow}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ mxObject.getGuid() ]
                }
            });
        }
    }

    private validateProps(props: ContainerProps): string {
        const errorMessage: string[] = [];
        if (props.mxObject) {
            if (!props.mxObject.isReference(this.ownerReference)) {
                errorMessage.push(` - Context object has no User / Owner association to it`);
            }
            if (errorMessage.length) {
                errorMessage.unshift("Configuration Error: \n");
            }
        }
        return errorMessage.join("\n");
    }

    private resetSubscription(contextObject: mendix.lib.MxObject) {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.fetchData(contextObject),
                guid: contextObject.getGuid()
            }));
        }
    }

    private unSubscribe() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    private fetchData(contextObject: mendix.lib.MxObject) {
        this.setState({
            initialRate: contextObject
                ? contextObject.get(this.props.rateAttribute) as number
                : 0
        });
    }
}

export { StarRatingInputContainer as default, ContainerProps };
