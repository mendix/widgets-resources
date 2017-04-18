import { Component, createElement } from "react";

import { Slider, SliderStatus } from "./Slider";
import { Label, LabelOrientation } from "./Label";

interface WrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
}

interface BooleanSliderContainerProps extends WrapperProps {
    booleanAttribute: string;
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
            isChecked: this.getAttributeValue(props.booleanAttribute, props.mxObject)
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleValidations = this.handleValidations.bind(this);
    }

    componentWillReceiveProps(newProps: BooleanSliderContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState({
            alertMessage: "",
            isChecked: this.getAttributeValue(newProps.booleanAttribute, newProps.mxObject)
        });
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
            && this.props.mxObject
            && !this.props.mxObject.isReadonlyAttr(this.props.booleanAttribute);
        const status: SliderStatus = this.props.mxObject
            ? enabled ? "enabled" : "disabled"
            : "no-context";

        return createElement(Slider as any, {
            alertMessage: this.state.alertMessage,
            isChecked: this.state.isChecked,
            onClick: this.handleToggle,
            status
        });
    }

    private getAttributeValue(attribute: string, mxObject?: mendix.lib.MxObject): boolean {
        if (mxObject) {
            return mxObject.get(attribute) as boolean;
        }

        return false;
    }

    private handleToggle() {
        const { booleanAttribute, mxObject, onChangeMicroflow } = this.props;
        if (mxObject) {
            mxObject.set(booleanAttribute, !mxObject.get(booleanAttribute));
            this.executeAction(onChangeMicroflow, mxObject.getGuid());
        }
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.unsubscribe();

        if (mxObject) {
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: () =>
                    this.setState({
                        alertMessage: "",
                        isChecked: this.getAttributeValue(this.props.booleanAttribute, mxObject)
                    }),
                guid: mxObject.getGuid()
            }));

            this.subscriptionHandles.push(mx.data.subscribe({
                attr: this.props.booleanAttribute,
                callback: () =>
                    this.setState({
                        alertMessage: "",
                        isChecked: this.getAttributeValue(this.props.booleanAttribute, mxObject)
                    }),
                guid: mxObject.getGuid()
            }));
            // Inline validation suspended until popup issue is fixed i.e popup validations still show up too
            // this.subscriptionHandles.push(mx.data.subscribe({
            //     callback: this.handleValidations,
            //     guid: mxObject.getGuid(),
            //     val: true
            // }));
        }
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]) {
        const validationMessage = validations[0].getErrorReason(this.props.booleanAttribute);
        if (validationMessage) this.setState({ alertMessage: validationMessage });
    }

    private unsubscribe() {
        if (this.subscriptionHandles) {
            this.subscriptionHandles.forEach(mx.data.unsubscribe);
        }
    }

    private executeAction(actionname: string, guid: string) {
        if (actionname) {
            window.mx.ui.action(actionname, {
                error: (error) =>
                    window.mx.ui.error(`Error while executing microflow ${actionname}: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                }
            });
        }
    }
}

export default BooleanSliderContainer;
