/**
 * @type {Cypress.PluginConfig}
 */
const getCompareSnapshotsPlugin = require("cypress-image-diff-js/dist/plugin");

module.exports = (on, config) => {
    getCompareSnapshotsPlugin(on, config);
};
