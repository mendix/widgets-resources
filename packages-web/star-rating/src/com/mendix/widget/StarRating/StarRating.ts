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
    private userEntity: string;
    private showTotal: boolean;

    private campaignReference: string;
    private userReference: string;

    private contextObject: mendix.lib.MxObject;
    private mxData: mendix.lib.MxObject[];

    postCreate() {
        this.campaignReference = this.campaignEntity.split("/")[0];
        this.userReference = this.userEntity.split("/")[0];
    }

    update(object: mendix.lib.MxObject, callback: Function) {
        this.contextObject = object;
        if (this.hasValidConfig) {
            this.updateData(() => {
                    this.updateRendering();
                    callback();
                });
        } else {
            callback();
        }
        this.resetSubscriptions();
    }

    updateRendering() {
        render(createElement(RatingComponent, this.getProps()), this.domNode);
    }

    private updateData(callback: Function) {
        if (this.contextObject) {
            const xpath = `//${this.rateEntity}[${this.campaignReference}='${this.contextObject.getGuid()}']`;
            const dataCallback = (objects: mendix.lib.MxObject[]) => {
                this.mxData = objects;
                callback();
            };
            this.fetchData(xpath, dataCallback);
        } else {
            this.mxData = [];
            callback();
        }
    }

    private getProps(): props {
        return {
            activeRate: this.mxData.length ? this.getRate() : 0.0,
            data: this.mxData,
            isReadOnly: this.contextObject ? this.showTotal : true, // || this.currentUser is not voteOwner
            onChange: (rate: number) => this.submitData(rate)
        };
    }

    private getRate(): number {
        if (this.showTotal) {
            const sum = this.mxData.reduce((a, b) => {
                return a + Number(b.get(this.rateAttribute));
                }, 0);
            // round-off to nearest 0.5 is buggy, should only return a whole number when rate is above that number
            return Math.round((sum / this.mxData.length) * 2) / 2;
        } else {
            return Math.round(Number(this.mxData[0].get(this.rateAttribute)) * 2) / 2;
        }
    }

    // TODO: Adding validation
    private hasValidConfig() {
        return true;
    }

    private resetSubscriptions() {
        this.unsubscribeAll();
    }

    private fetchData(xpath: string, callback: Function) {
        window.mx.data.get({
            callback,
            error: (error) => {
                window.logger.error(`${this.id} .fetchData ${xpath}
                : An error occurred while retrieving data:`, error);
                window.mx.ui.error(`Error while retrieving data`);
                callback([]);
            },
            xpath
        });
    }

    private submitData(rate: number) {
        const createCallback = (newRateMX: mendix.lib.MxObject) => {
            newRateMX.set(this.rateAttribute, rate);
            newRateMX.addReference(this.campaignReference, this.contextObject.getGuid());
            newRateMX.addReference(this.userReference, window.mx.session.getUserId());
            // assign user and campaign.
            this.commitData(newRateMX, () => {});
        };
        this.createData(this.rateEntity, createCallback);
    }

    private commitData(mxobj: mendix.lib.MxObject, callback: () => void) {
        window.mx.data.commit({
            callback,
            error: (error) => {
                window.logger.error(`${this.id} .committing ${mxobj.getGuid()}
                    : An error occurred while retrieving data:`, error);
                window.mx.ui.error(`An error occurred while committing data`);
            },
            mxobj
        });
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
