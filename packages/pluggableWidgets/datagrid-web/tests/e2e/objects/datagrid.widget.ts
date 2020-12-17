class Datagrid {
    private rows: string[];
    getAllRows(item: WebdriverIO.ElementArray): string[] {
        this.rows = [];
        item.forEach(item => {
            this.rows.push(item.getText());
        });
        return this.rows;
    }
}
export default new Datagrid();
