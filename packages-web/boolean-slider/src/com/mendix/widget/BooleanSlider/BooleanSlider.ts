import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import { Slider } from "./components/Slider";
import { ValidationAlert } from "./components/ValidationAlert";
import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

class BooleanSlider extends WidgetBase {
    // Properties from Mendix modeler
    booleanAttribute: string;
    onChangeMicroflow: string;

    private contextObject: mendix.lib.MxObject;
    private alertMessage: string;

    update(contextObject: mendix.lib.MxObject, callback: Function) {
        this.contextObject = contextObject;
        this.resetSubscriptions();
        this.updateRendering();

        callback();
    }

    updateRendering() {
        if (this.contextObject) {
            render(createElement(Slider, {
                enabled: !this.readOnly && !this.contextObject.isReadonlyAttr(this.booleanAttribute),
                hasError: !!this.alertMessage,
                isChecked: this.contextObject.get(this.booleanAttribute) as boolean,
                onClick: (value: boolean) => this.handleToggle(value),
                widgetId: this.id
            },
            this.alertMessage ? createElement(ValidationAlert, { message: this.alertMessage }) : null
            ), this.domNode);
        }
    }

    uninitialize() {
        unmountComponentAtNode(this.domNode);

        return true;
    }

    private handleToggle(value: boolean) {
        this.contextObject.set(this.booleanAttribute, value);
        this.executeAction(this.onChangeMicroflow, [ this.contextObject.getGuid() ]);
    }

    private resetSubscriptions() {
        this.unsubscribeAll();

        if (this.contextObject) {
            this.subscribe({
                callback: () => {
                    this.alertMessage = null;
                    this.updateRendering();
                },
                guid: this.contextObject.getGuid()
            });

            this.subscribe({
                attr: this.booleanAttribute,
                callback: () => {
                    this.alertMessage = null;
                    this.updateRendering();
                },
                guid: this.contextObject.getGuid()
            });

            this.subscribe({
                callback: (validations: mendix.lib.ObjectValidation[]) => this.handleValidations(validations),
                guid: this.contextObject.getGuid(),
                val: true
            });
        }
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]) {
        const validationMessage = validations[0].getErrorReason(this.booleanAttribute);
        if (validationMessage) {
            this.alertMessage = validationMessage;
            this.updateRendering();
        }
    }

    private executeAction(actionname: string, guids: string[]) {
        if (actionname) {
            window.mx.data.action({
                error: (error: Error) =>
                    window.mx.ui.error("An error occurred while executing microflow: " + error.message, true),
                origin: this.mxform,
                params: {
                    applyto: "selection",
                    actionname,
                    guids
                }
            });
        }
    }
}

// Declare widget prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
// tslint:disable : only-arrow-functions
dojoDeclare("com.mendix.widget.BooleanSlider.BooleanSlider", [ WidgetBase ], function (Source: any) {
    let result: any = {};
    for (let property in Source.prototype) {
        if (property !== "constructor" && Source.prototype.hasOwnProperty(property)) {
            result[property] = Source.prototype[property];
        }
    }
    return result;
} (BooleanSlider));
