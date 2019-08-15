class SingleLocationPage {
    get latitudeInput(): WebdriverIO.Element {
        return $(".mx-name-textBox1 input");
    }
    get longitudeInput(): WebdriverIO.Element {
        return $(".mx-name-textBox2 input");
    }
    get longitudeLabel(): WebdriverIO.Element {
        return $(".mx-name-textBox2 label");
    }
    get alert(): WebdriverIO.Element {
        return $(".widget-leaflet-maps-alert");
    }

    get map(): WebdriverIO.Element {
        return $(".widget-leaflet-maps");
    }

    get markers(): WebdriverIO.Element[] {
        return this.map.$$(".leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive");
    }

    open(): void {
        browser.url("/p/Playground");
    }
}

const singleLocationPage = new SingleLocationPage();
export default singleLocationPage;
