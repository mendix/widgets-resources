class HomePage {
    public get carousel() { return browser.element(".mx-name-carousel2"); }
    public get carouselLeftArrow() {
        return browser.element(".widget-carousel-wrapper > div > div.widget-carousel-control.left");
    }
    public get lastImage() {
        return browser.element(".widget-carousel-wrapper > div > div.widget-carousel-item-wrapper.animate > div.widget-carousel-item.active > img");
    }
    public get carouselRightArrow() {
        return browser.element(".widget-carousel-wrapper > div > div.widget-carousel-control.right");
    }
    public get leftArrowExist() {
        return browser.isExisting(".widget-carousel-wrapper > div > div.widget-carousel-control.left");
    }
    public get rightArrowExist() {
        return browser.isExisting(".widget-carousel-wrapper > div > div.widget-carousel-control.right");
    }
    public open(): void {
        browser.url("/");
    }
}

const defaultPage = new HomePage();

export default defaultPage;
