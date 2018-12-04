import { Container, Data } from "./namespace";
import { UrlHelper } from "./UrlHelper";

type MxObject = mendix.lib.MxObject;

export const fetchData = (options: Data.FetchDataOptions): Promise<MxObject[]> =>
    new Promise<MxObject[]>((resolve, reject) => {
        const { guid, entity, contextObject, inputParameterEntity } = options;
        if (entity && guid) {
            if (options.type === "XPath") {
                fetchByXPath({
                    guid,
                    entity,
                    constraint: options.constraint || ""
                })
                .then(mxObjects => resolve(mxObjects))
                .catch(message => reject({ message }));
            } else if (options.type === "microflow" && options.microflow) {
                fetchByMicroflow(options.microflow, guid, contextObject, inputParameterEntity)
                    .then(mxObjects => resolve(mxObjects))
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

const fetchByXPath = (options: Data.FetchByXPathOptions): Promise<MxObject[]> => new Promise<MxObject[]>((resolve, reject) => {
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

const fetchByMicroflow = (actionname: string, guid: string, contextObj: mendix.lib.MxObject, inputParameterEntity: string): Promise<MxObject[]> => {
    if (contextObj.getEntity() !== inputParameterEntity) {
        logger.warn("input parameter does not match the context object type");
    }

    return new Promise((resolve, reject) => {
        window.mx.ui.action(actionname, {
            params: {
                applyto: "selection",
                guids: [ guid ]
            },
            callback: (mxObjects: MxObject[] | any) => resolve(mxObjects),
            error: error => reject(`An error occurred while retrieving data via microflow: ${actionname}: ${error.message}`)
        });
    });
};

const fetchByNanoflow = (actionname: Data.Nanoflow, mxform: mxui.lib.form._FormBase): Promise<MxObject[]> =>
    new Promise((resolve: (objects: MxObject[]) => void, reject) => {
        const context = new mendix.lib.MxContext();
        window.mx.data.callNanoflow({
            nanoflow: actionname,
            origin: mxform,
            context,
            callback: resolve,
            error: error => reject(`An error occurred while retrieving data via nanoflow: ${actionname}: ${error.message}`)
        });
    });

export const fetchMarkerObjectUrl = (options: Data.FetchMarkerIcons, mxObject: mendix.lib.MxObject): Promise<string> =>
    new Promise((resolve, reject) => {
        const { type, markerIcon, imageAttribute, markerEnumImages } = options;
        if (type === "staticImage") {
            resolve(getStaticMarkerUrl(markerIcon));
        } else if (type === "systemImage" && mxObject && options.systemImagePath) {
            mxObject.fetch(options.systemImagePath, (imagePathObj: MxObject) => {
                if (imagePathObj.get("HasContents")) {
                    const url = window.mx.data.getDocumentUrl(imagePathObj.getGuid(), imagePathObj.get("changedDate") as number);

                    return window.mx.data.getImageUrl(url,
                        objectUrl => resolve(objectUrl),
                        error => reject(`Error while retrieving the image url: ${error.message}`)
                    );
                } else {
                    reject("Upload Image inorder to view marker");
                }
            });
        } else if (type === "enumImage" && mxObject) {
            const imageAttr = mxObject.get(imageAttribute) as string;
            resolve(getMxObjectMarkerUrl(imageAttr, markerEnumImages));
        } else {
            resolve("");
        }
    });

export const parseStaticLocations = (staticLocations: Container.DataSourceLocationProps[]): Container.Location[] => {
    return staticLocations.map(staticLocation => ({
        latitude: parseFloat(staticLocation.staticLatitude),
        longitude: parseFloat(staticLocation.staticLongitude),
        url: getStaticMarkerUrl(staticLocation.staticMarkerIcon)
    }));
};

export const getMxObjectMarkerUrl = (imageKey?: string, markerImages?: Container.EnumerationImages[]): string => {
    const image = markerImages ? markerImages.find(value => value.enumKey === imageKey) : undefined;

    return image
        ? getStaticMarkerUrl(image.enumImage as string)
        : "";
};

export const getStaticMarkerUrl = (enumImage?: string, staticMarkerIcon?: string): string =>
    enumImage
        ? UrlHelper.getStaticResourceUrl(enumImage)
        : staticMarkerIcon
        ? UrlHelper.getStaticResourceUrl(staticMarkerIcon)
        : "";
