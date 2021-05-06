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

    get leafletMarker(): WebdriverIO.Element {
        return this.getElement(".leaflet-marker-icon");
    }

    expectFewLeafletMarkers(): boolean {
        let markerList = this.leafletMarkers;
        browser.waitUntil(
            () => {
                markerList = this.leafletMarkers;
                return markerList.length > 1;
            },
            5000,
            "expected more than 1 marker to be populated"
        );
        return markerList.length > 1;
    }

    get leafletMarkers(): WebdriverIO.Element[] {
        return this.getElements(".leaflet-marker-icon");
    }

    get googleMarkers(): WebdriverIO.Element[] {
        return this.getElements('[src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png"]');
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
