import { Client, Element, RawResult } from "webdriverio";

export class BasePage {
    public get markers(): Client<RawResult<Element[]>> & RawResult<Element[]> {
        return browser.elements(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive");
    }
}
