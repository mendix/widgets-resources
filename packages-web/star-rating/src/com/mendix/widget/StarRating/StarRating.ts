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
    private rateType: "average" | "rating";
    private onChangeMicroflow: string;
    private averageAttribute: string;

    private contextObject: mendix.lib.MxObject;
    private ownerReference: string;

    update(object: mendix.lib.MxObject, callback?: Function) {
        this.contextObject = object;
        this.ownerReference = "System.owner";
        this.updateRendering();
        this.resetSubscriptions();

        if (callback) {
            callback();
        }
    }

    updateRendering() {
        render(createElement(RatingComponent, this.getProps()), this.domNode);
    }

    uninitialize(): boolean {
        unmountComponentAtNode(this.domNode);

        return true;
    }

    private getProps() {
        // The contextObject entityType for "average" is different from that of "rating"
        // InitialRate for rateType "average" comes from averageAttribute on campaignEntity
        // InitialRate for rateType "rating" comes from rateAttribute on rateEntity
        const initialRate = this.contextObject
            ? this.rateType === "average"
                ? this.contextObject.get(this.averageAttribute) as number
                : this.contextObject.get(this.rateAttribute) as number
            : 0 ;

        return {
            configurationError: this.hasValidConfiguration(),
            initialRate,
            handleOnChange: this.onChangeMicroflow && this.submitData.bind(this),
            onRateMicroflow: this.onChangeMicroflow,
            ownerGUID: this.contextObject.get(this.ownerReference) as string,
            rateType: this.rateType,
            readOnly: this.readOnly
        };
    }

    private hasValidConfiguration(): string | undefined {
        const errorMessage: string[] = [];
        if (this.contextObject) {
            if ((this.rateType === "average") && this.contextObject.getEntity() !== this.campaignEntity.split("/")[1]) {
                errorMessage.push(" - For rate type 'average', the contextObject should be campaign entity");
            }
            if ((this.rateType === "rating") && this.contextObject.getEntity() !== this.rateEntity) {
                errorMessage.push(` - For rate type 'Single', the contextObject be rate entity '${this.rateEntity}'`);
            }
            if (this.rateType === "rating" && !this.contextObject.isReference(this.ownerReference)) {
                errorMessage.push(` - Context object has no User / Owner association to it`);
            }
            if (errorMessage.length) {
                errorMessage.unshift("Configuration Error: ");
            }
        }
        return errorMessage.length ? errorMessage.join("\n") : undefined;
    }

    private submitData(rate: number, microflowError: (error: Error) => void) {
        if (this.contextObject) {
            this.contextObject.set(this.rateAttribute, rate);
            if (this.onChangeMicroflow) {
                this.executeMicroflow(this.contextObject.getGuid(), this.onChangeMicroflow, microflowError);
            }
        }
    }

    private executeMicroflow(mendixGUID: string, microflow: string, error: (error: Error) => void) {
        window.mx.ui.action(microflow, {
            error,
            params: {
                applyto: "selection",
                guids: [ mendixGUID ]
            }
        });
    }

    private resetSubscriptions() {
        this.unsubscribeAll();
        if (this.contextObject) {
            this.subscribe({
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });
            [ this.rateAttribute, this.averageAttribute ].forEach(attribute => this.subscribe({
                    attr: attribute,
                    callback: () => this.updateRendering(),
                    guid: this.contextObject.getGuid()
                })
            );
        }
    }
}

// Declare widget prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
// tslint:disable : only-arrow-functions
dojoDeclare("com.mendix.widget.StarRating.StarRating", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const property in Source.prototype) {
        if (property !== "constructor" && Source.prototype.hasOwnProperty(property)) {
            result[property] = Source.prototype[property];
        }
    }
    return result;
}(StarRating));
