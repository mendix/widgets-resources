import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { Slider, SliderStatus } from "./components/Slider";
import { ValidationAlert } from "./components/ValidationAlert";

class BooleanSlider extends WidgetBase {
    // Properties from Mendix modeler
    booleanAttribute: string;
    onChangeMicroflow: string;

    private contextObject: mendix.lib.MxObject;

    update(contextObject: mendix.lib.MxObject, callback?: Function) {
        this.contextObject = contextObject;
        this.resetSubscriptions();
        this.updateRendering();

        if (callback) callback();
    }

    uninitialize(): boolean {
        unmountComponentAtNode(this.domNode);

        return true;
    }

    private updateRendering(alertMessage?: string) {
        const contextObject = this.contextObject;
        const status: SliderStatus = contextObject
            ? !this.readOnly && !contextObject.isReadonlyAttr(this.booleanAttribute) ? "enabled" : "disabled"
            : "no-context";

        render(createElement(Slider, {
                hasError: !!alertMessage,
                isChecked: !!(contextObject && contextObject.get(this.booleanAttribute)),
                onClick: (value: boolean) => this.handleToggle(value),
                status
            },
            alertMessage ? createElement(ValidationAlert, { message: alertMessage }) : null
        ), this.domNode);
    }

    private handleToggle(value: boolean) {
        this.contextObject.set(this.booleanAttribute, value);
        this.executeAction(this.onChangeMicroflow, [ this.contextObject.getGuid() ]);
    }

    private executeAction(actionname: string, guids: string[]) {
        if (actionname) {
            window.mx.ui.action(actionname, {
                error: error =>
                    window.mx.ui.error(`An error occurred while executing microflow: ${error.message}`, true),
                params: {
                    applyto: "selection",
                    guids
                }
            });
        }
    }

    private resetSubscriptions() {
        this.unsubscribeAll();

        if (this.contextObject) {
            this.subscribe({
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });

            this.subscribe({
                attr: this.booleanAttribute,
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });

            this.subscribe({
                callback: validations => this.handleValidations(validations),
                guid: this.contextObject.getGuid(),
                val: true
            });
        }
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]) {
        const validationMessage = validations[0].getErrorReason(this.booleanAttribute);
        if (validationMessage) {
            this.updateRendering(validationMessage);
        }
    }
}

// Declare widget prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
// tslint:disable : only-arrow-functions
dojoDeclare("com.mendix.widget.BooleanSlider.BooleanSlider", [ WidgetBase ], function(Source: any) {
    let result: any = {};
    for (let property in Source.prototype) {
        if (property !== "constructor" && Source.prototype.hasOwnProperty(property)) {
            result[property] = Source.prototype[property];
        }
    }
    return result;
}(BooleanSlider));
