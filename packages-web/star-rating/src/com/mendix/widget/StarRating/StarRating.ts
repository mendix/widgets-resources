import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { StarRating as RatingComponent } from "./components/StarRating";

class StarRating extends WidgetBase {
    // Properties from Mendix modeler
    private rateAttribute: string;
    private campaignEntity: string;
    private rateEntity: string;
    private rateType: "overall" | "single";
    private ownerReference: string;
    private onChangeMicroflow: string;
    private averageAttribute: string;
    private step: number;
    private maximumStars: number;
    private fractions: number;
    private start: number;

    private campaignReference: string;
    private contextObject: mendix.lib.MxObject;


    postCreate() {
        this.campaignReference = this.campaignEntity.split("/")[0];
        this.campaignEntity = this.campaignEntity.split("/")[1];
        this.ownerReference = "System.owner";
        this.fractions = 2;
        this.step = 1;
        this.maximumStars = 5;
        this.start = 0;
    }

    update(object: mendix.lib.MxObject, callback: Function) {
        this.contextObject = object;
        if (this.hasValidConfig()) {
            this.updateRendering();
            callback();
        } else {
            callback();
        }
        this.resetSubscriptions();
    }

    updateRendering() {
        render(createElement(RatingComponent, this.getProps()), this.domNode);
    }

    private getProps() {
        const isReadOnly = this.readOnly || !(this.contextObject && this.rateType === "single"
        && this.contextObject.get(this.ownerReference) === window.mx.session.getUserId());

        return {
            fractions: this.fractions,
            initialRate: this.getRate(),
            onChange: (rate: number) => this.submitData(rate),
            isReadOnly,
            rateType: this.rateType,
            start: this.start,
            step: this.step,
            stop: this.maximumStars
        };
    }

    private getRate(): number {
        const maximumValue = this.step * this.maximumStars;
        const rate = !this.contextObject ? 0.0 : this.rateType === "overall"
            ? this.contextObject.get(this.averageAttribute) as number
            : this.contextObject.get(this.rateAttribute) as number;
        return rate;
    }

    private submitData(rate: number) {
        this.contextObject.set(this.rateAttribute, rate);
        if (this.onChangeMicroflow) {
            this.executeCommitMicroflow(this.contextObject);
        }
    }

    private executeCommitMicroflow(mendixObject: mendix.lib.MxObject) {
        window.mx.ui.action(this.onChangeMicroflow, {
            error: (error: Error) =>
                window.mx.ui.error(`Error while executing microflow: ${this.onChangeMicroflow}: ${error.message}`),
            params: {
                applyto: "selection",
                guids: [ mendixObject.getGuid() ]
            }
        });
    }

    private hasValidConfig() {
        let errorMessage: string[] = [];
        let invalid: boolean;

        if (!this.contextObject) {
            return true; // incase there's no contextObject
        }
        invalid = (this.rateType === "overall") && this.contextObject.getEntity() !== this.campaignEntity;
        if (invalid) {
            errorMessage.push(" - For rate type 'Overall', the contextObject be campaign entity");
        }
        invalid = (this.rateType === "single") && this.contextObject.getEntity() !== this.rateEntity;
        if (invalid) {
            errorMessage.push(` - For rate type 'Single', the contextObject be rate entity '${this.rateEntity}'`);
        }
        invalid = this.rateType === "single" && !this.contextObject.isReference(this.ownerReference);
        if (invalid) {
            errorMessage.push(` - Context object has no User / Owner association to it`);
        }

        if (errorMessage.length) {
            errorMessage.unshift("Configuration Error: ");
            window.mx.ui.error(errorMessage.join("\n"));
        }
        return !errorMessage.length;
    }

    private resetSubscriptions() {
        this.unsubscribeAll();
        if (this.contextObject) {
            this.subscribe({
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });
            this.subscribe({
                attr: this.rateAttribute,
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });
            this.subscribe({
                attr: this.averageAttribute,
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });
        }
    }

    uninitialize(): boolean {
        unmountComponentAtNode(this.domNode);
        return true;
    }
}

// Declare widget prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
// tslint:disable : only-arrow-functions
dojoDeclare("com.mendix.widget.StarRating.StarRating", [ WidgetBase ], function(Source: any) {
    let result: any = {};
    for (let property in Source.prototype) {
        if (property !== "constructor" && Source.prototype.hasOwnProperty(property)) {
            result[property] = Source.prototype[property];
        }
    }
    return result;
}(StarRating));
