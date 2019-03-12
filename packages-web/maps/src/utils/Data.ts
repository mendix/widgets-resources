import { Container, Data } from "./namespace";
import { UrlHelper } from "./UrlHelper";

type MxObject = mendix.lib.MxObject;

export const fetchData = (options: Data.FetchDataOptions): Promise<MxObject[]> => {
    const { type, entity, contextObject, inputParameterEntity, microflow, mxform, nanoflow } = options;
    if (type === "XPath" && entity) {
        return fetchByXPath({
            guid: contextObject && contextObject.getGuid(),
            entity,
            constraint: options.constraint || ""
        });
    }
    if (type === "microflow" && microflow && contextObject) {
        return fetchByMicroflow(microflow, contextObject, mxform, inputParameterEntity);
    }
    if (type === "nanoflow" && nanoflow.nanoflow && contextObject) {
        return fetchByNanoflow(nanoflow, contextObject, mxform, inputParameterEntity);
    }

    return Promise.reject(new Error("Failed data retrieval"));
};

const fetchByXPath = (options: Data.FetchByXPathOptions): Promise<MxObject[]> => new Promise<MxObject[]>((resolve, reject) => {
    const { guid, entity, constraint } = options;

    const entityPath = entity.split("/");
    const entityName = entityPath.length > 1 ? entityPath[entityPath.length - 1] : entity;
    const xpath = `//${entityName}${constraint.split("[%CurrentObject%]").join(guid)}`;

    window.mx.data.get({
        xpath,
        callback: resolve,
        error: error => reject(new Error(`An error occurred while retrieving data via XPath: ${xpath}: ${error.message}`))
    });
});

const fetchByMicroflow = (actionName: string, contextObj: MxObject, mxform: mxui.lib.form._FormBase, inputParameterEntity: string): Promise<MxObject[]> => {
    if (contextObj.getEntity() !== inputParameterEntity) {
        Promise.reject(new Error("Input parameter entity does not match the context object type"));
    }

    return new Promise((resolve, reject) => {
        const context = new mendix.lib.MxContext();
        context.setTrackObject(contextObj);
        window.mx.ui.action(actionName, {
            context,
            origin: mxform,
            callback: (mxObjects: MxObject[]) => resolve(mxObjects),
            error: error => reject(new Error(`An error occurred while retrieving data via microflow: ${actionName}: ${error.message}`))
        });
    });
};

const fetchByNanoflow = (nanoflow: Data.Nanoflow, contextObj: MxObject, mxform: mxui.lib.form._FormBase, inputParameterEntity: string): Promise<MxObject[]> => {
    if (contextObj.getEntity() !== inputParameterEntity) {
        Promise.reject(new Error("Input parameter entity does not match the context object type"));
    }

    return new Promise((resolve: (objects: MxObject[]) => void, reject) => {
        const context = new mendix.lib.MxContext();
        context.setTrackObject(contextObj);
        window.mx.data.callNanoflow({
            nanoflow,
            origin: mxform,
            context,
            callback: (data:  MxObject[]) => resolve(data),
            error: error => reject(new Error(`An error occurred while retrieving data via nanoflow: ${error.message}`))
        });
    });
};

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
                        error => reject(new Error(`Error while retrieving the image url: ${error.message}`))
                    );
                } else {
                    logger.warn("Marker system image object does not have any content, fallback to default marker");
                    resolve("");
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
