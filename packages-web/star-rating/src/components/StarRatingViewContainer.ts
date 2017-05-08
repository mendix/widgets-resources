import { Component, createElement } from "react";
import { StarRating } from "./StarRating";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

export interface ContainerProps extends WrapperProps {
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    // Properties from Mendix modeler
    campaignEntity: string;
    averageAttribute: string;
}

interface ContainerState {
    initialRate: number;
}

export default class StarRatingViewContainer extends Component<ContainerProps, ContainerState> {
    private subscriptionHandles: number[];

    constructor(props: ContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = { initialRate: 0 };
        this.subscribe(this.props.mxObject);
    }

    render() {
        return createElement(StarRating, {
            fractions: 2,
            initialRate: this.state.initialRate,
            readOnly: true
        });
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
        this.subscribe(nextProps.mxObject);
        this.updateRating(nextProps.mxObject);
    }

    componentDidMount() {
        this.updateRating(this.props.mxObject);
    }

    componentWillUnmount() {
        this.unSubscribe();
    }

    private subscribe(contextObject: mendix.lib.MxObject) {
        this.unSubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.updateRating(contextObject),
                guid: contextObject.getGuid()
            }));
        }
    }

    private unSubscribe() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];
    }

    private updateRating(contextObject: mendix.lib.MxObject) {
        this.setState({
            initialRate: contextObject
                ? contextObject.get(this.props.averageAttribute) as number
                : 0
        });
    }
}
