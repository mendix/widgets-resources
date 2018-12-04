import { Container } from "./namespace";

export const validateLocationProps = <T extends Partial<Container.MapsContainerProps>> (locationData: T): string => {
    const { locations, zoomLevel, autoZoom, apiToken, mapProvider, markerImages, friendlyId } = locationData;
    const errorMessage: string[] = [];
    if (!autoZoom && (zoomLevel && zoomLevel < 2)) {
        errorMessage.push(`${friendlyId}: Zoom Level should be greater than one`);
    }
    if (!(mapProvider === "openStreet") && !apiToken) {
        errorMessage.push(`${friendlyId}: An api token for ${mapProvider} is required`);
    }
    if (locations && locations.length) {
        locations.forEach((location, index) => {
            if (location.dataSourceType && location.dataSourceType !== "static") {
                if (!(location.latitudeAttribute && location.longitudeAttribute)) {
                    errorMessage.push(`${friendlyId}: Latitude and longitude attributes are required for data source ${locations[index].dataSourceType} at location ${index + 1}`);
                }
            } else if (!(location.staticLatitude && location.staticLongitude)) {
                errorMessage.push(`${friendlyId}: Invalid static locations. Latitude and longitude are required at location ${index + 1}`);
            }
            if (location.markerImage === "enumImage" && !(markerImages && markerImages.length)) {
                errorMessage.push(`${friendlyId}: Marker images are required for image attribute at location ${index + 1}`);
            }
            if (location.markerImage === "systemImage") {
                if (!location.systemImagePath) {
                    errorMessage.push(`${friendlyId}: System image path is required at location ${index + 1}`);
                } else {
                    const imagePath = location.systemImagePath.indexOf("/") > 0 ? location.systemImagePath.split("/")[1] : location.systemImagePath;
                    const imagePathEntity = (imagePath && window.mx) && window.mx.meta.getEntity(imagePath);
                    if (!(imagePathEntity && imagePathEntity.inheritsFrom("System.Image"))) {
                        errorMessage.push(`${imagePath} should inherit from 'System.Image'`);
                    }
                }
            }
            if (location.dataSourceType === "microflow" && !location.dataSourceMicroflow) {
                errorMessage.push(`${friendlyId}: A Microflow is required for Data source Microflow at location ${index + 1}`);
            }
            if (!(location.onClickEvent === "doNothing")) {
                if (location.onClickEvent === "callMicroflow" && !location.onClickMicroflow) {
                    errorMessage.push(`${friendlyId}: A Microflow is required for on click Microflow at location ${index + 1}`);
                }
                if (location.onClickEvent === "callNanoflow" && !(location.onClickNanoflow && location.onClickNanoflow.nanoflow)) {
                    errorMessage.push(`${friendlyId}: A Nanoflow is required for on click Nanoflow at location ${index + 1}`);
                }
                if (location.onClickEvent === "showPage" && !location.page) {
                    errorMessage.push(`${friendlyId}: A page is required for on click show page at location ${index + 1}`);
                }
            }
        });
    }

    return errorMessage.join(", ");
};

export const validateLocations = (location: Container.Location): Promise<Container.Location> => new Promise((resolve, reject) => {
    if (validLocation(location)) {
        resolve(location);
    } else {
        reject(`invalid location: latitude ${location.latitude}, longitude ${location.longitude}`);
    }
});

export const validLocation = (location: Container.Location) => {
    const { latitude: lat, longitude: lng } = location;

    return typeof lat === "number" && typeof lng === "number"
    && lat <= 90 && lat >= -90
    && lng <= 180 && lng >= -180
    && !(lat === 0 && lng === 0);
};
