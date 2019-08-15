export class BasePage {
    get map(): WebdriverIO.Element {
        return $(".widget-leaflet-maps");
    }
    get markers(): WebdriverIO.Element[] {
        return this.map.$$(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive");
    }
}
