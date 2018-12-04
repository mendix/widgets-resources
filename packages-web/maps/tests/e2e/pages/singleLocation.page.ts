import { BasePage } from "./base.page";

class SingleLocationPage extends BasePage {

    public get latitudeInput() {
        return browser.element(".mx-name-textBox1 input");
    }
    public get longitudeInput() {
        return browser.element(".mx-name-textBox2 input");
    }
    public get longitudeLabel() {
        return browser.element(".mx-name-textBox2 label");
    }
    public get alert() {
        return browser.element(".widget-leaflet-maps-alert");
    }

    public open(): void {
        browser.url("/p/Playground");
    }
}

const singleLocationPage = new SingleLocationPage();
export default singleLocationPage;
