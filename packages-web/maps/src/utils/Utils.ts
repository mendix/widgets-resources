import { CSSProperties } from "react";
import { DynamicMarkersType, HeightUnitEnum, MarkersType, WidthUnitEnum } from "../../typings/MapsProps";
import { DynamicValue, EditableValue, ObjectItem, ValueStatus } from "mendix";
import { v4 as uuid } from "uuid";

declare type Option<T> = T | undefined;

export interface Dimensions {
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
}

export interface ModeledMarker {
    uuid: string;
    location: string;
    title?: string;
    customMarker?: string;
    action?: () => void;
}

export interface Marker {
    latitude: number;
    longitude: number;
    url: string;
    onClick?: () => void;
    title?: string;
}

export const translateZoom = (level: string): number => {
    switch (level) {
        case "world":
            return 1;
        case "continent":
            return 5;
        case "city":
            return 10;
        case "street":
            return 15;
        case "buildings":
            return 20;
    }
    return 1;
};

export const getDimensions = <T extends Dimensions>(props: T): CSSProperties => {
    const style: CSSProperties = {
        width: props.widthUnit === "percentage" ? `${props.width}%` : `${props.width}px`
    };
    if (props.heightUnit === "percentageOfWidth") {
        const ratio = (props.height / 100) * props.width;
        if (props.widthUnit === "percentage") {
            style.height = "auto";
            style.paddingBottom = `${ratio}%`;
        } else {
            style.height = `${ratio}px`;
        }
    } else if (props.heightUnit === "pixels") {
        style.height = `${props.height}px`;
    } else if (props.heightUnit === "percentageOfParent") {
        style.height = `${props.height}%`;
    }

    return style;
};

export const analyzeStaticMarker = (marker: MarkersType): ModeledMarker => {
    let location, title;
    if (marker.dataSourceType === "static") {
        title = marker.title;
        if (marker.locationType === "address") {
            location = marker.address!;
        } else {
            location = `${marker.latitude},${marker.longitude}`;
        }
    } else {
        if (marker.propertyContext === "attribute") {
            title = getValue(marker.titleAttribute);
            if (marker.locationType === "address") {
                location = getValue(marker.addressAttribute);
            } else {
                location = `${getValue(marker.latitudeAttribute)},${getValue(marker.longitudeAttribute)}`;
            }
        } else {
            title = getValue(marker.titleExpression);
            if (marker.locationType === "address") {
                location = getValue(marker.addressExpression);
            } else {
                location = `${getValue(marker.latitudeExpression)},${getValue(marker.longitudeExpression)}`;
            }
        }
    }

    return {
        uuid: uuid(),
        location,
        title,
        action: marker.onClick?.execute,
        customMarker: marker.customMarker?.value?.uri
    };
};

export const analyzeDynamicMarker = (marker: DynamicMarkersType, item: ObjectItem): ModeledMarker => {
    const { locationType, address, latitude, longitude, onClickAttribute, title } = marker;
    let location;
    if (locationType === "address") {
        location = address ? getValue(address(item)) : "";
    } else {
        location = `${latitude ? getValue(latitude(item)) : 0},${longitude ? getValue(longitude(item)) : 0}`;
    }
    return {
        uuid: item.id,
        location,
        title: title ? getValue(title(item)) : "",
        action: onClickAttribute ? onClickAttribute(item).execute : undefined,
        customMarker: marker.customMarkerDynamic?.value?.uri
    };
};

export const getValue = (property?: DynamicValue<any> | EditableValue<any>): Option<any> => {
    return property && property.status === ValueStatus.Available && property.value ? property.value : undefined;
};

export const analyzeLocations = (locations?: ModeledMarker[], mapToken?: string): Promise<Marker[]> => {
    return new Promise<Marker[]>((resolve, reject) => {
        const unknownLatitudeLongitudes =
            locations?.filter(l => {
                const latLong = l.location.split(",");
                return !(latLong.length === 2 && parseFloat(latLong[0]) > 0 && parseFloat(latLong[1]) > 0);
            }) || [];
        const latitudeLongitudes =
            locations?.filter(
                location => !unknownLatitudeLongitudes.find(uLocation => uLocation.location === location.location)
            ) || [];

        const markerLocations = latitudeLongitudes.map(location => {
            const latLong = location.location.split(",");
            const newObject: Marker = {
                latitude: parseFloat(latLong[0]),
                longitude: parseFloat(latLong[1]),
                url: location.customMarker || "",
                onClick: location.action,
                title: location.title
            };
            return newObject;
        });

        if (unknownLatitudeLongitudes.length > 0) {
            if (!mapToken) {
                reject(new Error("API key required in order to use markers containing address"));
            }
            Promise.all(
                unknownLatitudeLongitudes.map(location =>
                    fetch(obtainGeodecodeApiAddress(location.location, mapToken!))
                )
            )
                .then(responses => Promise.all(responses.map(res => res.json())))
                .then((googleDecodeResults: any) => {
                    markerLocations.push(
                        ...googleDecodeResults.map((resolvedAddress: any, index: number) => {
                            const decodedLocation = resolvedAddress.results[0].geometry.location;
                            const newObject: Marker = {
                                latitude: decodedLocation.lat,
                                longitude: decodedLocation.lng,
                                url: unknownLatitudeLongitudes[index].customMarker ?? "",
                                title: unknownLatitudeLongitudes[index].title ?? "",
                                onClick: unknownLatitudeLongitudes[index].action ?? undefined
                            };
                            return newObject;
                        })
                    );
                    resolve(markerLocations);
                });
        } else {
            resolve(markerLocations);
        }
    });
};

export const obtainGeodecodeApiAddress = (address: string, mapsToken: string): string => {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${mapsToken}`;
};

export const getCurrentUserLocation = (): Promise<Marker> => {
    return new Promise<Marker>((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        url: defaultMarkerImage
                    });
                },
                () => {
                    reject(new Error("Current user location is not available"));
                }
            );
        } else {
            reject(new Error("Current user location is not available"));
        }
    });
};

const defaultMarkerImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAgwQECuLT1eNAAACtUlEQVRIx43Vy29VVRQG8F8r2LT0Vm2kDTUmgh1Zqsx0hpSZeuNIozMeiYaADhggjHwkRonGKbb9A6TKyCghJpRHIYoDH0QeI0tbiiFO1LaJ1LbLwd3cnn3vEbvu5J5vfWuvtb69zjotyqziBUOe8pgH8YdJPxv3tTlrsE2OWRAlvwWj+hvpLdlTuyMO2gCWXTbrFvo84kn3gX984m13ynP3u5xynbPLw5lvo93OJ+9FvWXh29wWwhXP/2d7VVeFMG1rc/Za+Gfa76lQhzEhTOVVtKfiP2jQpMxaHE2NtK2C76Xs/x9eO+LzlK5+cfPClabiWwyqqhpsOrjDNeGOx2uPx4RokG69N03XJ2DKAesb5AxhBCoWhHOZu9vZpjE6ozvjTAjzOnlVCLuy7GfTZR2y3XZvmUlHFKvYI4SXGRWWsrF5QwgnddaRilNC2F9g9VgShvle+CGTbkqY1omdxowZQsVNYTJr4ifhO34XvizAg0I4hJ1WhLBiCIeF8ESB+ZVwu1UXbhXgzeASXk/X1+K1hLClwJzFA62JsmpRR6IBy/+lqFZ/oa8A3wBPYzjRV4ziGchU6MOfXCoVcUYFQ447bge6zAq/Non4LSPCko0FxwEhnFKpI12+EcK+7BqXhU95RQi7s0EaF8KMw561wxGzQjhtXYG1Vwgv3R3l81lx3c40jfJpD2WcC8Jcbf2NCqGaudfZ70Y9eNK+LDsvitocQr9F4aoOjTagqmqgCd/guvB3mhl8KISxNS+UE0J4fxVqc1EIR9e00j4SwoT7i3BvWh9flDSSF3+ibKnC1nTEtQY5c+mup/CBMndvaiRM2JONFj32ulD39hQ7KlqbdxxMvS37xYzfsMmjBtVeu0Ufe9fivbrcYsR86cd1zvDqxZVXcNc6PWfINpvrn/cfjTtpoZn6LyulNWLKSWq8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAyLTEyVDE2OjE2OjQzKzAwOjAwPPYLaAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMi0xMlQxNjoxNjo0MyswMDowME2rs9QAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC";
