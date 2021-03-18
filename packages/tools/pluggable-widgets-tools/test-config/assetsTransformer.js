const path = require("path");

/**
 * This is necessary for `packages/pluggableWidgets/maps-web/src/components/__tests__` since we
 * make use of inline `require` statements for the leaflet icon images, but do not care about
 * the actual images themselves in the test environment.
 */

module.exports = {
    process(src, filename, config, options) {
        return "module.exports = " + JSON.stringify(path.basename(filename)) + ";";
    }
};
