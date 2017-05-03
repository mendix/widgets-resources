import { Component, createElement } from "react";
import { Alert } from "./Alert";
import { StarRating } from "./StarRating";

interface ContainerProps {
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    // Properties from Mendix modeler
    campaignEntity: string;
    averageAttribute: string;
}

class StarRatingViewContainer extends Component<ContainerProps, { alertMessage?: string, initialRate: number }> {
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = { initialRate: 0 };
        this.subscribe(this.props.mxObject);
    }

    render() {
        if (this.state.alertMessage) {
            return createElement(Alert, { message: this.state.alertMessage });
        } else {
            return createElement(StarRating, {
                fractions: 2,
                initialRate: this.state.initialRate,
                readOnly: true
            });
        }
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
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

    private subscribe(contextObject: mendix.lib.MxObject) {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.fetchData(contextObject),
                guid: contextObject.getGuid()
            }));
            this.subscriptionHandles.push( window.mx.data.subscribe({
                attr: this.props.averageAttribute,
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
                ? contextObject.get(this.props.averageAttribute) as number
                : 0
        });
    }
}

export { StarRatingViewContainer as default, ContainerProps };
