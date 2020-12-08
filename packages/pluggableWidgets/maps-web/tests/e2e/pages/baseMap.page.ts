import { Page } from "./page";

export class BaseMapPage extends Page {
    get leafletMap(): WebdriverIO.Element {
        return this.getElement(".widget-leaflet-maps");
    }

    get googleMap(): WebdriverIO.Element {
        return this.getElement(".widget-google-maps");
    }

    get googleMaps(): WebdriverIO.Element[] {
        return this.getElements(".widget-google-maps");
    }

    get leafletMarkers(): WebdriverIO.Element[] {
        browser.pause(1000);
        return this.getElements(".leaflet-marker-icon");
    }

    get leafletFirstMarker(): WebdriverIO.Element {
        browser.pause(1000);
        return this.getElement(".leaflet-marker-icon");
    }

    get googleMarkers(): WebdriverIO.Element[] {
        browser.pause(1000);
        return this.getElements("img[src*='gstatic.com/mapfiles']").filter(e => e.getAttribute("usemap"));
    }

    get googleMarker(): WebdriverIO.Element {
        browser.pause(1000);
        return this.getElements("img[src*='gstatic.com/mapfiles']")
            .filter(e => e.getAttribute("usemap"))
            .pop();
    }

    get dialog(): WebdriverIO.Element {
        return this.getElement(".modal-body.mx-dialog-body").$("p");
    }
}

const mapPage = new BaseMapPage();
export default mapPage;
