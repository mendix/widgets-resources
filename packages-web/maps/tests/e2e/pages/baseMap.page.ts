import { Page } from "./page";

export class BaseMapPage extends Page {
    get leafletMap(): WebdriverIO.Element {
        return this.getElement(".widget-leaflet-maps");
    }

    get leafletMaps(): WebdriverIO.Element[] {
        return this.getElements(".widget-leaflet-maps");
    }

    get googleMap(): WebdriverIO.Element {
        return this.getElement(".widget-google-maps");
    }

    get googleMaps(): WebdriverIO.Element[] {
        return this.getElements(".widget-google-maps");
    }

    get leafletMarkers(): WebdriverIO.Element[] {
        return this.getElements(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive");
    }

    get googleMarkers(): WebdriverIO.Element[] {
        return this.getElements(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive");
    }

    get leafletAlert(): WebdriverIO.Element {
        return this.getElement(".widget-leaflet-maps-alert");
    }

    get googleAlert(): WebdriverIO.Element {
        return this.getElement(".widget-google-maps-alert");
    }

    noAlerts(): boolean {
        const leafletAlerts = this.getElements(".widget-leaflet-maps-alert");
        const googleAlerts = this.getElements(".widget-google-maps-alert");

        return leafletAlerts.length < 1 && googleAlerts.length < 1;
    }
}

const mapPage = new BaseMapPage();
export default mapPage;
