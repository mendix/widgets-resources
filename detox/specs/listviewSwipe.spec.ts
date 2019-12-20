import { Pages, ListViewSwipe } from "./elements";
import { by, element, expect } from "detox";

describe("Listview Swipe", () => {
    beforeAll(async () => {
        await Pages().openListViewSwipe();

        const tab = await element(by.id("tabContainer1$tabPage2$tabHeader"));
        await expect(tab).toBeVisible();
        await tab.tap();
    });

    it("should render the list view swipe", async () => {
        const listviewSwipe = ListViewSwipe("listViewSwipe3");
        await expect(listviewSwipe.getListViewSwipe()).toBeVisible();
        await listviewSwipe.getListViewSwipe().swipe("right");
        await listviewSwipe.getListViewSwipe().tap();
        await listviewSwipe.getListViewSwipe().swipe("left");
        await listviewSwipe.getListViewSwipe().tap();
    });
});
