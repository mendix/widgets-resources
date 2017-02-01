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
    private rateType: "average" | "single";
    private ownerReference: string;
    private onChangeMicroflow: string;
    private averageAttribute: string;

    private contextObject: mendix.lib.MxObject;

    update(object: mendix.lib.MxObject, callback?: Function) {
        this.contextObject = object;
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
        return {
            averageAttribute: this.averageAttribute,
            campaignEntity: this.campaignEntity,
            contextObject: this.contextObject,
            onChangeMicroflow: this.onChangeMicroflow,
            ownerReference: this.ownerReference,
            rateAttribute: this.rateAttribute,
            rateEntity: this.rateEntity,
            rateType: this.rateType,
            readOnly: this.readOnly
        };
    }

    private resetSubscriptions() {
        this.unsubscribeAll();
        if (this.contextObject) {
            this.subscribe({
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });
            [ this.rateAttribute, this.averageAttribute ].forEach(
                (attribute) => this.subscribe({
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
