/* eslint-disable */
class HomePage {
    public get carousel() {
        return $(".mx-name-carousel2");
    }
    public get carouselLeftArrow() {
        return $(".widget-carousel-wrapper > div > div.widget-carousel-control.left");
    }
    public get lastImage() {
        return $(
            ".widget-carousel-wrapper > div > div.widget-carousel-item-wrapper.animate > div.widget-carousel-item.active > img"
        );
    }
    public get carouselRightArrow() {
        return $(".widget-carousel-wrapper > div > div.widget-carousel-control.right");
    }
    public get leftArrowExist() {
        return $(".widget-carousel-wrapper > div > div.widget-carousel-control.left").isExisting();
    }
    public get rightArrowExist() {
        return $(".widget-carousel-wrapper > div > div.widget-carousel-control.right").isExisting();
    }
    public open(): void {
        browser.url("/");
    }
}

const defaultPage = new HomePage();

export default defaultPage;
