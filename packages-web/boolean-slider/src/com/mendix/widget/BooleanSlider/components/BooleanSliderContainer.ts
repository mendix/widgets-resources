import { Component, createElement } from "react";

import { Slider, SliderStatus } from "./Slider";
import { Label, LabelOrientation } from "./Label";

interface BooleanSliderContainerProps {
    booleanAttribute: string;
    contextObject: mendix.lib.MxObject;
    onChangeMicroflow: string;
    label?: string;
    orientation: LabelOrientation;
    readOnly: boolean;
}

interface BooleanSliderContainerState {
    alertMessage?: string;
    isChecked?: boolean;
}

class BooleanSliderContainer extends Component<BooleanSliderContainerProps, BooleanSliderContainerState> {
    private subscriptionHandles: number[];

    constructor(props: BooleanSliderContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = {
            alertMessage: "",
            isChecked: this.getAttributeValue(this.props.contextObject, this.props.booleanAttribute)
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        this.resetSubscriptions(this.props.contextObject);
        this.setState({ alertMessage: "" });
    }

    componentWillReceiveProps(newProps: BooleanSliderContainerProps) {
        this.resetSubscriptions(newProps.contextObject);
    }

    render() {
        if (this.props.label) {
            return createElement(Label as any, {
                label: this.props.label,
                orientation: this.props.orientation
            }, this.renderSlider());
        }
        return this.renderSlider();
    }

    private renderSlider() {
        const enabled = !this.props.readOnly
            && this.props.contextObject
            && !this.props.contextObject.isReadonlyAttr(this.props.booleanAttribute);
        const status: SliderStatus = this.props.contextObject
            ? enabled ? "enabled" : "disabled"
            : "no-context";

        return createElement(Slider as any, {
            alertMessage: this.state.alertMessage,
            isChecked: this.state.isChecked,
            onClick: this.handleToggle,
            status
        });
    }

    private getAttributeValue(contextObject: mendix.lib.MxObject, attribute: string): boolean {
        if (contextObject) {
            return contextObject.get(attribute) as boolean;
        }

        return false;
    }

    private handleToggle() {
        const { booleanAttribute, contextObject, onChangeMicroflow } = this.props;
        contextObject.set(booleanAttribute, !contextObject.get(booleanAttribute));
        this.executeAction(onChangeMicroflow, contextObject.getGuid());
    }

    private resetSubscriptions(contextObject?: mendix.lib.MxObject) {
        this.unsubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: () =>
                    this.setState({
                        alertMessage: "",
                        isChecked: this.getAttributeValue(contextObject, this.props.booleanAttribute)
                    }),
                guid: contextObject.getGuid()
            }));

            this.subscriptionHandles.push(mx.data.subscribe({
                attr: this.props.booleanAttribute,
                callback: () =>
                    this.setState({
                        alertMessage: "",
                        isChecked: this.getAttributeValue(contextObject, this.props.booleanAttribute)
                    }),
                guid: contextObject.getGuid()
            }));

            this.subscriptionHandles.push(mx.data.subscribe({
                callback: (validations) => this.handleValidations(validations),
                guid: contextObject.getGuid(),
                val: true
            }));
        }
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]) {
        const validationMessage = validations[0].getErrorReason(this.props.booleanAttribute);
        if (validationMessage) this.setState({ alertMessage: validationMessage });
    }

    private unsubscribe() {
        if (this.subscriptionHandles) {
            this.subscriptionHandles.forEach((handle) => mx.data.unsubscribe(handle));
        }
    }

    private executeAction(actionname: string, guid: string) {
        if (actionname) {
            window.mx.ui.action(actionname, {
                error: (error) =>
                    this.setState({ alertMessage: `An error occurred while executing microflow: ${error.message}` }),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                }
            });
        }
    }
}

export default BooleanSliderContainer;
