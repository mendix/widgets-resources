import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { Slider, SliderStatus } from "./components/Slider";

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
        const enabled = !this.readOnly
            && this.contextObject
            && !this.contextObject.isReadonlyAttr(this.booleanAttribute);
        const status: SliderStatus = this.contextObject
            ? enabled ? "enabled" : "disabled"
            : "no-context";

        render(createElement(Slider, {
            alertMessage,
            isChecked: this.contextObject && this.contextObject.get(this.booleanAttribute) as boolean,
            onClick: () => this.handleToggle(),
            status
        }), this.domNode);
    }

    private handleToggle() {
        this.contextObject.set(this.booleanAttribute, !this.contextObject.get(this.booleanAttribute));
        this.executeAction(this.onChangeMicroflow, this.contextObject.getGuid());
    }

    private executeAction(actionname: string, guid: string) {
        if (actionname) {
            window.mx.ui.action(actionname, {
                error: (error) =>
                    this.updateRendering(`An error occurred while executing microflow: ${error.message}`),
                params: {
                    applyto: "selection",
                    guids: [ guid ]
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
                callback: (validations) => this.handleValidations(validations),
                guid: this.contextObject.getGuid(),
                val: true
            });
        }
    }

    private handleValidations(validations: mendix.lib.ObjectValidation[]) {
        const validationMessage = validations[0].getErrorReason(this.booleanAttribute);
        if (validationMessage) this.updateRendering(validationMessage);
    }
}

// Declare widget prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
// tslint:disable : only-arrow-functions
dojoDeclare("com.mendix.widget.BooleanSlider.BooleanSlider", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const property in Source.prototype) {
        if (property !== "constructor" && Source.prototype.hasOwnProperty(property)) {
            result[property] = Source.prototype[property];
        }
    }
    return result;
}(BooleanSlider));
