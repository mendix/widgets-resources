import page from "../pages/page";

export class DataGrid {
    getGrid(gridNumber: number): WebdriverIO.Element {
        return page.getElement(`.mx-name-grid${gridNumber}`);
    }

    getGridRow(rowNumber: number): WebdriverIO.Element {
        return page.getElement(`.mx-name-index-${rowNumber}`);
    }
}

const dataGrid = new DataGrid();
export default dataGrid;
