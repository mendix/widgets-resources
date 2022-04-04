const getCompareSnapshotsPlugin = require("cypress-image-diff-js/dist/plugin");
const installLogsPrinter = require("cypress-terminal-report/src/installLogsPrinter");

module.exports = (on, config) => {
    getCompareSnapshotsPlugin(on, config);
    installLogsPrinter(on, {
        printLogsToConsole: "onFail"
    });
};
