import page from "../../../../../../configs/e2e/src/pages/page";

describe("tree-view-web", () => {
    beforeEach(() => {
        page.open(); // resets page
    });

    describe("capabilities: expand", () => {
        it("expands a node", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const treeView = page.getWidget("treeView1");

            treeView.waitForDisplayed({ timeout: 5000 });

            const firstNode = page.waitForElement(".mx-name-treeView1 .widget-tree-view-branch-header-value", treeView);

            firstNode.click();
            browser.pause(1000);
            browser.saveElement(treeView, "treeViewExpanded");

            expect(browser.checkElement(treeView, "treeViewExpanded")).toEqual(0);
        });

        it("expands multiple nodes", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const treeView = page.getWidget("treeView1");

            treeView.waitForDisplayed({ timeout: 5000 });

            const treeNode = page.waitForElements(".mx-name-treeView1 .widget-tree-view-branch-header-value", treeView);

            treeNode[0].click();
            treeNode[1].click();

            const innerTreeNode = page.waitForElements(".mx-name-treeView2 .widget-tree-view-branch-header-value");

            innerTreeNode[4].click();
            browser.pause(1000);
            browser.saveElement(treeView, "treeViewMultipleExpanded");

            expect(browser.checkElement(treeView, "treeViewMultipleExpanded")).toEqual(0);
        });
    });

    describe("capabilities: collapse", () => {
        it("collapses a node", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const treeView = page.getWidget("treeView1");

            treeView.waitForDisplayed({ timeout: 5000 });

            const firstNode = page.waitForElement(".mx-name-treeView1 .widget-tree-view-branch-header-value", treeView);

            firstNode.click();
            firstNode.click();
            browser.pause(1000);
            browser.saveElement(treeView, "treeViewCollapsed");

            expect(browser.checkElement(treeView, "treeViewCollapsed")).toEqual(0);
        });

        it("collapses multiple nodes", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const treeView = page.getWidget("treeView1");

            treeView.waitForDisplayed({ timeout: 5000 });

            const treeNode = page.waitForElements(".mx-name-treeView1 .widget-tree-view-branch-header-value", treeView);

            treeNode[0].click();
            treeNode[1].click();

            const innerTreeNode = page.waitForElements(".mx-name-treeView2 .widget-tree-view-branch-header-value");

            innerTreeNode[4].click();
            innerTreeNode[4].click();
            treeNode[1].click();
            treeNode[0].click();
            browser.pause(1000);
            browser.saveElement(treeView, "treeViewMultipleCollapsed");

            expect(browser.checkElement(treeView, "treeViewMultipleCollapsed")).toEqual(0);
        });
    });
});
