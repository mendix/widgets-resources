import { Container } from "./namespace";

export const validateLocationProps = <T extends Partial<Container.MapsContainerProps>>(locationData: T): string => {
    const {
        locations,
        zoomLevel,
        autoZoom,
        apiToken,
        mapProvider,
        markerImages,
        defaultCenterLatitude,
        defaultCenterLongitude
    } = locationData;
    const errorMessage: string[] = [];
    if (!autoZoom && zoomLevel && zoomLevel < 2) {
        errorMessage.push("Zoom Level should be greater than one");
    }
    if (!(mapProvider === "openStreet") && !apiToken) {
        errorMessage.push(`An 'Access token' for 'Map provider' ${mapProvider} is required`);
    }
    if (defaultCenterLatitude || defaultCenterLongitude) {
        const valid = validLocation({
            latitude: defaultCenterLatitude && parseFloat(defaultCenterLatitude),
            longitude: defaultCenterLongitude && parseFloat(defaultCenterLongitude)
        });
        if (!valid) {
            errorMessage.push(
                `Invalid default center: latitude '${defaultCenterLatitude}', longitude '${defaultCenterLongitude}'`
            );
        }
    }
    if (locations && locations.length) {
        locations.forEach((location, index) => {
            if (location.dataSourceType && location.dataSourceType !== "static") {
                if (!(location.latitudeAttribute && location.longitudeAttribute)) {
                    errorMessage.push(
                        `Latitude and longitude attributes are required for data source ${
                            locations[index].dataSourceType
                        } at location ${index + 1}`
                    );
                }
            } else if (!location.staticLatitude || !location.staticLongitude) {
                errorMessage.push(
                    `Invalid static location: Latitude and longitude are required at location ${index + 1}`
                );
            } else if (location.staticLatitude && location.staticLongitude) {
                const valid = validLocation({
                    latitude: parseFloat(location.staticLatitude),
                    longitude: parseFloat(location.staticLongitude)
                });
                if (!valid) {
                    errorMessage.push(
                        `Invalid static location: latitude '${location.staticLatitude}', longitude '${
                            location.staticLongitude
                        }' at location ${index + 1}`
                    );
                } else {
                    if (location.onClickEvent && location.onClickEvent !== "doNothing") {
                        errorMessage.push(
                            `Static location items (at location ${index +
                                1}) does not support maker events. The On click can only be set to "Do nothing"`
                        );
                    }
                }
            }
            if (location.markerImage === "enumImage" && !(markerImages && markerImages.length)) {
                errorMessage.push(`Marker images are required for image attribute at location ${index + 1}`);
            }
            if (location.markerImage === "systemImage") {
                if (!location.systemImagePath) {
                    errorMessage.push(`System image path is required at location ${index + 1}`);
                } else {
                    const imagePath =
                        location.systemImagePath.indexOf("/") > 0
                            ? location.systemImagePath.split("/")[1]
                            : location.systemImagePath;
                    const imagePathEntity = imagePath && window.mx && window.mx.meta.getEntity(imagePath);
                    if (!(imagePathEntity && imagePathEntity.inheritsFrom("System.Image"))) {
                        errorMessage.push(`${imagePath} should inherit from 'System.Image'`);
                    }
                }
            }
            if (location.dataSourceType === "microflow" && !location.dataSourceMicroflow) {
                errorMessage.push(`A Microflow is required for Data source Microflow at location ${index + 1}`);
            }
            if (!(location.onClickEvent === "doNothing")) {
                if (location.onClickEvent === "callMicroflow" && !location.onClickMicroflow) {
                    errorMessage.push(`A Microflow is required for on click Microflow at location ${index + 1}`);
                }
                if (
                    location.onClickEvent === "callNanoflow" &&
                    !(location.onClickNanoflow && location.onClickNanoflow.nanoflow)
                ) {
                    errorMessage.push(`A Nanoflow is required for on click Nanoflow at location ${index + 1}`);
                }
                if (location.onClickEvent === "showPage" && !location.page) {
                    errorMessage.push(`A page is required for on click show page at location ${index + 1}`);
                }
            }
        });
    }

    return errorMessage.join(", ");
};

export const validLocation = (location: { latitude?: any; longitude?: any }): boolean => {
    const { latitude: lat, longitude: lng } = location;

    return (
        typeof lat === "number" &&
        typeof lng === "number" &&
        lat <= 90 &&
        lat >= -90 &&
        lng <= 180 &&
        lng >= -180 &&
        !(lat === 0 && lng === 0)
    );
};
