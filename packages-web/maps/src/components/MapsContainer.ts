import { Component, createElement } from "react";
import { LeafletEvent } from "leaflet";

import GoogleMap from "./GoogleMap";
import { LeafletMap } from "./LeafletMap";
import { Container } from "../utils/namespace";
import { fetchData, fetchMarkerObjectUrl, parseStaticLocations } from "../utils/Data";
import { validateLocationProps, validateLocations } from "../utils/Validations";
import { hot } from "react-hot-loader";

import "leaflet/dist/leaflet.css";
// Re-uses images from ~leaflet package
// Use workaround for marker icon, that is not standard compatible with webpack
// https://github.com/ghybs/leaflet-defaulticon-compatibility#readme
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "../ui/Maps.css";

type MapsContainerProps = Container.MapsContainerProps;
type MapProps = Container.MapProps;
type Location = Container.Location;
type DataSourceLocationProps = Container.DataSourceLocationProps;

export interface MapsContainerState {
    alertMessage?: string;
    locations: Location[];
    isFetchingData?: boolean;
}

class MapsContainer extends Component<MapsContainerProps, MapsContainerState> {
    private subscriptionHandles: number[] = [];
    readonly state: MapsContainerState = {
        alertMessage: "",
        locations: [],
        isFetchingData: false
    };

    render() {
        const mapsApiToken = this.props.apiToken ? this.props.apiToken.replace(/ /g, "") : undefined;
        const commonProps = {
            ...this.props as MapProps,
            allLocations: this.state.locations,
            fetchingData: this.state.isFetchingData,
            className: this.props.class,
            alertMessage: this.state.alertMessage,
            divStyles: parseStyle(this.props.style),
            onClickMarker: this.onClickMarker,
            mapsToken: mapsApiToken,
            inPreviewMode: false
        };

        return this.props.mapProvider === "googleMaps"
            ? createElement(GoogleMap, { ...commonProps })
            : createElement(LeafletMap, { ...commonProps });
    }

    UNSAFE_componentWillReceiveProps(nextProps: MapsContainerProps) {
        this.resetSubscriptions(nextProps.mxObject);
        const validationMessage = validateLocationProps(nextProps);
        if (validationMessage) {
            this.setState({ alertMessage: validationMessage });
        } else {
            this.fetchData(nextProps.mxObject);
        }
    }

    componentWillUnmount() {
        this.unsubscribeAll();
    }

    private resetSubscriptions(contextObject?: mendix.lib.MxObject) {
        this.unsubscribeAll();
        if (this.props.locations && this.props.locations.length && contextObject) {
                this.subscriptionHandles.push(window.mx.data.subscribe({
                    guid: contextObject.getGuid(),
                    callback: () => {
                        if (!this.state.isFetchingData === true) {
                            this.fetchData(contextObject);
                        }
                    }
                }));
                this.props.locations.forEach(location => {
                    this.subscriptionHandles.push(window.mx.data.subscribe({
                        entity: location.locationsEntity as string,
                        callback: () => this.fetchData(contextObject)
                    }));
                    [
                        location.latitudeAttribute,
                        location.longitudeAttribute,
                        location.staticMarkerIcon,
                        location.markerImageAttribute
                    ].forEach(attr => this.subscriptionHandles.push(window.mx.data.subscribe({
                            attr,
                            callback: () => this.fetchData(contextObject),
                            guid: contextObject.getGuid()
                        }))
                    );
                });
            }
        }

    private unsubscribeAll() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];
    }

    private fetchData = (contextObject?: mendix.lib.MxObject) => {
        this.setState({ isFetchingData: true });
        const { defaultCenterLatitude, defaultCenterLongitude } = this.props;
        Promise.all(this.props.locations.map(locationAttr => this.retrieveData(locationAttr, contextObject))).then(locations => {
            const flattenLocations = locations.reduce((loc1, loc2) => loc1.concat(loc2), []);
            if (defaultCenterLatitude && defaultCenterLongitude) {
                flattenLocations.push({
                    latitude: parseFloat(defaultCenterLatitude),
                    longitude: parseFloat(defaultCenterLongitude)
                });
            }

            return Promise.all(flattenLocations.map(location => validateLocations(location)));
        }).then(validLocations =>
            this.setState({
                locations: validLocations,
                isFetchingData: false,
                alertMessage: ""
            })).catch(alertMessage => {
                this.setState({
                    locations: [],
                    alertMessage,
                    isFetchingData: false
                });
            });
    }

    private retrieveData = (locationOptions: DataSourceLocationProps, contextObject?: mendix.lib.MxObject): Promise<Location[]> =>
        new Promise((resolve, reject) => {
                const guid = contextObject && contextObject.getGuid();
                if (locationOptions.dataSourceType === "static") {
                    const staticLocation = parseStaticLocations([ locationOptions ]);
                    resolve(staticLocation);
                } else if (locationOptions.dataSourceType === "context" && contextObject) {
                    this.setLocationsFromMxObjects([ contextObject ], locationOptions)
                        .then(locations => resolve(locations));
                } else if (contextObject) {
                    fetchData({
                        guid,
                        type: locationOptions.dataSourceType,
                        entity: locationOptions.locationsEntity,
                        constraint: locationOptions.entityConstraint,
                        microflow: locationOptions.dataSourceMicroflow,
                        mxform: this.props.mxform,
                        nanoflow: locationOptions.dataSourceNanoflow,
                        contextObject,
                        inputParameterEntity: locationOptions.inputParameterEntity
                    })
                    .then(mxObjects => this.setLocationsFromMxObjects(mxObjects, locationOptions))
                    .then(locations => resolve(locations))
                    .catch(reason => reject(`${reason}`));
                } else {
                    resolve([]);
                }
            })

    private setLocationsFromMxObjects = (mxObjects: mendix.lib.MxObject[], locationAttr: DataSourceLocationProps): Promise<Location[]> =>
        Promise.all(mxObjects.map(mxObject =>
            fetchMarkerObjectUrl({
                    type: locationAttr.markerImage,
                    markerIcon: locationAttr.staticMarkerIcon,
                    imageAttribute: locationAttr.markerImageAttribute,
                    systemImagePath: locationAttr.systemImagePath,
                    markerEnumImages: this.props.markerImages
                }, mxObject).then(markerUrl => {
                    return {
                        latitude: Number(mxObject.get(locationAttr.latitudeAttribute)),
                        longitude: Number(mxObject.get(locationAttr.longitudeAttribute)),
                        mxObject,
                        url: markerUrl,
                        locationAttr
                    };
                })
            ))

    private onClickMarker = (event: LeafletEvent & google.maps.MouseEvent, locationAttr: DataSourceLocationProps) => {
        const { locations } = this.state;
        const latitude = this.props.mapProvider === "googleMaps" ? event.latLng.lat() : event.target.getLatLng().lat;
        this.executeAction(locations[locations.findIndex(targetLoc => targetLoc.latitude === latitude)], locationAttr);
    }

    private executeAction = (markerLocation: Location, locationAttr: DataSourceLocationProps) => {
        const object = markerLocation.mxObject;

        if (object) {
            const { mxform } = this.props;
            const { onClickEvent, onClickMicroflow, onClickNanoflow, openPageAs, page } = locationAttr;
            const context = new mendix.lib.MxContext();
            context.setContext(object.getEntity(), object.getGuid());

            if (onClickEvent === "callMicroflow" && onClickMicroflow) {
                mx.ui.action(onClickMicroflow, {
                    context,
                    origin: mxform,
                    error: error => mx.ui.error(`Error while executing on click microflow ${onClickMicroflow} : ${error.message}`)
                });
            } else if (onClickEvent === "callNanoflow" && onClickNanoflow.nanoflow) {
                window.mx.data.callNanoflow({
                    nanoflow: onClickNanoflow,
                    origin: mxform,
                    context,
                    error: error => {
                        logger.error(`${this.props.friendlyId}: Error while executing on click nanoflow: ${error.message}`);
                        mx.ui.error(`Error while executing on click nanoflow: ${error.message}`);
                    }
                });
            } else if (onClickEvent === "showPage" && page) {
                window.mx.ui.openForm(page, {
                    location: openPageAs,
                    context,
                    error: error => {
                        logger.error(`${this.props.friendlyId}: Error while opening page ${page}: ${error.message}`);
                        mx.ui.error(`Error while opening page ${page}: ${error.message}`);
                    }
                });
            }
        }
    }
}

export const parseStyle = (style = ""): {[key: string]: string} => { // Doesn't support a few stuff.
    try {
        return style.split(";").reduce<{[key: string]: string}>((styleObject, line) => {
            const pair = line.split(":");
            if (pair.length === 2) {
                const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                styleObject[name] = pair[1].trim();
            }

            return styleObject;
        }, {});
    } catch (error) {
        // tslint:disable-next-line no-console
        window.console.log("Failed to parse style", style, error);
    }

    return {};
};

export default hot(module)(MapsContainer);
