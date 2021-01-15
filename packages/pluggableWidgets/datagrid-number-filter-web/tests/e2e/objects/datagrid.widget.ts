class Datagrid {
    getAllRows(items: WebdriverIO.ElementArray): string[] {
        /* TODO: When I tried to use getText() in a loop to get the text it's taking almost 1min to process. So instead of using getText I am using getHTML with replace for this case. Maybe in the future will be possible to back to getText() */
        return items.map(item => item.getHTML().replace(/(<([^>]+)>)/gi, ""));
    }
}
export default new Datagrid();
