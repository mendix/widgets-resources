import { Pages, ListViewSwipe, TabContainer } from "./elements";
import { device, expect } from "detox";

describe("Listview Swipe", () => {
    beforeAll(async () => {
        await Pages().openListViewSwipe();

        await TabContainer("tabContainerListViewSwipe")
            .tab("tabPageButtons")
            .header()
            .tap();
    });

    it("should render the list view swipe", async () => {
        const listviewSwipe = ListViewSwipe("listViewSwipeButtons", "listViewButtons");
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
