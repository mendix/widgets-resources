import page from "../../../../../../configs/e2e/src/pages/page";

describe("gallery-web", () => {
    beforeEach(() => {
        page.open(); // resets page
    });

    describe("capabilities: sorting", () => {
        it("applies the default sort order from the data source option", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const gallery = page.getWidget("gallery1");

            gallery.waitForDisplayed({ timeout: 5000 });
            browser.saveElement(gallery, "galleryContent");

            expect(browser.checkElement(gallery, "galleryContent")).toEqual(0);
        });

        it("changes order of data choosing another option in the dropdown sort", () => {
            const gallery = page.getWidget("gallery1");
            const dropdownSort = page.waitForElement(".mx-name-gallery1 .dropdown-container .form-control", gallery);

            dropdownSort.click();
            const dropdownSortList = page.waitForElement(
                ".mx-name-gallery1 .dropdown-container .dropdown-list",
                gallery
            );

            dropdownSortList.$$("li")[4].click();
            browser.saveElement(gallery, "galleryDropdownSort");

            expect(browser.checkElement(gallery, "galleryDropdownSort")).toEqual(0);
        });
    });

    describe("capabilities: filtering", () => {
        it("filters by text", () => {
            const gallery = page.getWidget("gallery1");
            const textFilter = page.getElement(".mx-name-gallery1 .form-control", gallery);

            textFilter.addValue("Leo");
            browser.pause(1000);
            browser.saveElement(gallery, "galleryTextFilter");

            expect(browser.checkElement(gallery, "galleryTextFilter")).toEqual(0);
        });

        it("filters by number", () => {
            const gallery = page.getWidget("gallery1");
            const textFilter = page.getElements(".mx-name-gallery1 .form-control", gallery);

            textFilter[1].addValue("32");
            browser.pause(1000);
            browser.saveElement(gallery, "galleryNumberFilter");

            expect(browser.checkElement(gallery, "galleryNumberFilter")).toEqual(0);
        });

        it("filters by date", () => {
            const gallery = page.getWidget("gallery1");
            const textFilter = page.getElements(".mx-name-gallery1 .form-control", gallery);

            textFilter[3].addValue("10/10/1986");
            browser.pause(1000);
            browser.saveElement(gallery, "galleryDateFilter");

            expect(browser.checkElement(gallery, "galleryDateFilter")).toEqual(0);
        });
    });

    describe("capabilities: onClick action", () => {
        it("check the context", () => {
            const gallery = page.getWidget("gallery1");
            const textFilter = page.getElement(".mx-name-gallery1 .form-control", gallery);

            textFilter.addValue("Leo");
            browser.pause(1000);

            const galleryItem = page.getElement(".mx-name-gallery1 .widget-gallery-item", gallery);
            galleryItem.waitForDisplayed();
            galleryItem.click();

            const context = "You've clicked at Leo's face.";
            const popUpElement = page.getElement(".mx-dialog-body > p");
            const popUpContext = popUpElement.getText();

            expect(context).toEqual(popUpContext);
        });
    });
});
