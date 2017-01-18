import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { StarRating as RatingComponent, StarRatingProps as props } from "./components/StarRating";


class StarRating extends WidgetBase {
    // Properties from Mendix modeler
    private rateAttribute: string;
    private campaignEntity: string;
    private rateEntity: string;
    private rateType: "overall" | "single";
    private ownerReference: string;
    private onChangeMicroflow: string;
    private averageAttribute: string;

    private campaignReference: string;

    private contextObject: mendix.lib.MxObject;


    postCreate() {
        this.campaignReference = this.campaignEntity.split("/")[0];
        this.campaignEntity = this.campaignEntity.split("/")[1];
        this.ownerReference = "System.owner";
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

    private getProps(): props {
        const isReadOnly = !(this.rateType === "single"
            && this.contextObject.get(this.ownerReference) === window.mx.session.getUserId());
        return {
            activeRate: this.contextObject ? this.getRate() : 0.0,
            isReadOnly,
            onChange: (rate: number) => this.submitData(rate)
        };
    }

    private getRate(): number {
        if (this.rateType === "overall") {
            return Math.round(Number(this.contextObject.get(this.averageAttribute)) * 2) / 2;
        } else {
            return Math.round(Number(this.contextObject.get(this.rateAttribute)) * 2) / 2;
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

    // TODO: Adding validation
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

    private submitData(rate: number) {
        const createCallback = (mxRateNew: mendix.lib.MxObject) => {
            mxRateNew.set(this.rateAttribute, rate);
            mxRateNew.addReference(this.campaignReference, this.contextObject.getGuid());
            // assign user and campaign.
            this.commitData(mxRateNew);
        };

        if (this.contextObject) {
            this.contextObject.set(this.rateAttribute, rate);
            this.commitData(this.contextObject);
        } else {
            this.createData(this.rateEntity, createCallback);
        }
    }

    private commitData(mxRate: mendix.lib.MxObject, callbackFunction?: () => void) {
        const callback = callbackFunction || (() => {});
        if (this.onChangeMicroflow) {
            this.executeCommitMicroflow(mxRate);
        } else {
            window.mx.data.commit({
            callback,
            error: (error) => {
                window.logger.error(`${this.id} .committing ${mxRate.getGuid()}
                    : An error occurred while retrieving data:`, error);
                window.mx.ui.error(`An error occurred while committing data`);
            },
            mxobj: mxRate
        });
        }
    }

    private createData(entity: string, callback: (obj: mendix.lib.MxObject) => void) {
        window.mx.data.create({
            callback,
            entity,
            error: (error) => {
                window.logger.error(`${this.id} .createData
                    : An error occurred while retrieving data:`, error);
                window.mx.ui.error(`An error occurred while creating data`);
            }
        });
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
