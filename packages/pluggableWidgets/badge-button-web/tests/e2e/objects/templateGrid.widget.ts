import page from "../../../../../../configs/e2e/src/pages/page";

class TemplateGrid {
    get rowCount(): number {
        return page.waitForElements(".mx-templategrid-row").length;
    }
}

const templateGrid = new TemplateGrid();
export default templateGrid;
