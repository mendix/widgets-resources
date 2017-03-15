import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import StarRatingContainer from "./components/StarRatingContainer";

class StarRating extends WidgetBase {
    // Properties from Mendix modeler
    private rateAttribute: string;
    private campaignEntity: string;
    private rateEntity: string;
    private rateType: "average" | "rating";
    private onChangeMicroflow: string;
    private averageAttribute: string;

    update(contextObject: mendix.lib.MxObject, callback?: () => void) {
        this.updateRendering(contextObject);

        if (callback) {
            callback();
        }
    }

    updateRendering(contextObject: mendix.lib.MxObject) {
        render(createElement(StarRatingContainer, {
            averageAttribute: this.averageAttribute,
            campaignEntity: this.campaignEntity,
            contextObject,
            onChangeMicroflow: this.onChangeMicroflow,
            rateAttribute: this.rateAttribute,
            rateEntity: this.rateEntity,
            rateType: this.rateType,
            readOnly: this.readOnly
        }), this.domNode);
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
    const result: any = {};
    for (const property in Source.prototype) {
        if (property !== "constructor" && Source.prototype.hasOwnProperty(property)) {
            result[property] = Source.prototype[property];
        }
    }
    return result;
}(StarRating));
