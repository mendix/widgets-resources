import page from "../pages/page";

class TemplateGrid {
    public get rowCount(): number {
        return page.getElements(".mx-templategrid-row").length;
    }
}

const templateGrid = new TemplateGrid();
export default templateGrid;
