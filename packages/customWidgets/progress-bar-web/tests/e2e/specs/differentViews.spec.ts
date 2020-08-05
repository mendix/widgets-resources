import page from "../../../../../../configs/e2e/src/pages/page";
import ProgressBar from "../objects/progressBar.widget";

describe("Progress Bar", () => {
    const progressBar = new ProgressBar("progressBar1");

    it("renders in a group box", () => {
        page.open("p/groupBox");

        progressBar.element.waitForDisplayed();
        const value = progressBar.value;

        const textBoxValueElement = page.getWidget("textBox1");
        expect(`you are already at ${value}`).toContain(textBoxValueElement.getText());
    });

    it("renders when listens to data grid", () => {
        page.open("p/listenToGrid");

        const grid = page.getWidget("index-0");
        const gridValue = grid.$(".mx-datagrid-data-wrapper").getText();
        grid.click();

        progressBar.element.waitForDisplayed();
        const value = progressBar.value;

        expect(`you are already at ${value}`).toContain(gridValue);
    });

    it("renders in a list view", () => {
        page.open("p/listView");

        progressBar.element.waitForDisplayed();
        const value = progressBar.value;

        const textBoxValueElement = page.getWidget("textBox1");
        expect(`you are already at ${value}`).toContain(textBoxValueElement.getText());
    });

    it("renders in a template grid", () => {
        page.open("p/templateGrid");

        progressBar.element.waitForDisplayed();
        const value = progressBar.value;

        const textBoxValueElement = page.getWidget("textBox1");
        expect(`you are already at ${value}`).toContain(textBoxValueElement.getText());
    });

    it("renders in a tab container", () => {
        page.open("p/tabContainer");

        page.getWidget("tabPage2").click();

        progressBar.element.waitForDisplayed();
        const value = progressBar.value;

        const textBoxValueElement = page.getWidget("textBox1");
        expect(`you are already at ${value}`).toContain(textBoxValueElement.getText());
    });
});
