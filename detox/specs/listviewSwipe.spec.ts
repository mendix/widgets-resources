import { Pages, ListViewSwipe } from "./elements";
import { by, device, element, expect } from "detox";

describe("Listview Swipe", () => {
    beforeAll(async () => {
        await Pages().openListViewSwipe();

        const tab = await element(by.id("tabContainer1$tabPage2$tabHeader"));
        await expect(tab).toBeVisible();
        await tab.tap();
    });

    it("should render the list view swipe", async () => {
        const listviewSwipe = ListViewSwipe("listViewSwipe3", "listView2");
        await expect(listviewSwipe.getListViewSwipe(0)).toBeVisible();
        await listviewSwipe.getListViewSwipe(0).swipe("right");
        await listviewSwipe.getListViewSwipe(0).tap();
        await listviewSwipe.getListViewSwipe(0).swipe("left");
        await listviewSwipe.getListViewSwipe(0).tap();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
