import { Data } from "./namespaces";

type MxObject = mendix.lib.MxObject;

/* eslint-disable */
export const fetchData = (options: Data.FetchDataOptions): Promise<MxObject[]> =>
    new Promise<MxObject[]>((resolve, reject) => {
        const { guid, entity } = options;
        if (entity && guid) {
            if (options.type === "XPath") {
                fetchByXPath({
                    guid,
                    entity,
                    constraint: options.constraint || ""
                })
                    .then(resolve)
                    .catch(message => reject({ message }));
            } else if (options.type === "microflow" && options.microflow) {
                fetchByMicroflow(options.microflow, guid)
                    .then(resolve)
                    .catch(message => reject({ message }));
            } else if (options.type === "nanoflow" && options.nanoflow.nanoflow && options.mxform) {
                fetchByNanoflow(options.nanoflow, options.mxform)
                    .then(resolve)
                    .catch(message => reject({ message }));
            }
        } else {
            reject("entity & guid are required");
        }
    });

const fetchByXPath = (options: Data.FetchByXPathOptions): Promise<MxObject[]> =>
    new Promise<MxObject[]>((resolve, reject) => {
        const { guid, entity, constraint } = options;
        const entityPath = entity.split("/");
        const entityName = entityPath.length > 1 ? entityPath[entityPath.length - 1] : entity;
        const xpath = `//${entityName}${constraint.split("[%CurrentObject%]").join(guid)}`;

        window.mx.data.get({
            xpath,
            callback: resolve,
            error: error => reject(`An error occurred while retrieving data via XPath: ${xpath}: ${error.message}`)
        });
    });

export const fetchByMicroflow = (actionname: string, guid: string): Promise<MxObject[]> =>
    new Promise((resolve: (objects: MxObject[]) => void, reject) => {
        window.mx.data.action({
            params: {
                actionname,
                applyto: "selection",
                guids: [guid]
            },
            callback: resolve,
            error: error =>
                reject(`An error occurred while retrieving data via microflow: ${actionname}: ${error.message}`)
        });
    });

export const fetchByNanoflow = (actionname: mx.Nanoflow, mxform: mxui.lib.form._FormBase): Promise<MxObject[]> =>
    new Promise((resolve: (objects: MxObject[]) => void, reject) => {
        const context = new mendix.lib.MxContext();
        window.mx.data.callNanoflow({
            nanoflow: actionname,
            origin: mxform,
            context,
            callback: resolve,
            error: error =>
                reject(`An error occurred while retrieving data via nanoflow: ${actionname}: ${error.message}`)
        });
    });
