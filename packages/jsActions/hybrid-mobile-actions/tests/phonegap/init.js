const path = require("path");
const shell = require("shelljs");

const CONFIG_FOLDER = "config";
const SRC_FOLDER = "src";
const WWW_FOLDER = path.join("src", "www");
const STYLES_FOLDER = path.join(WWW_FOLDER, "styles");

const BASE_DEP_FOLDER = path.join("node_modules", "@mendix", "mendix-hybrid-app-base");

const CONFIG_PATH = path.join(SRC_FOLDER, "config.xml.mustache");
const INDEX_PATH = path.join(WWW_FOLDER, "index.html.mustache");
const STYLES_PATH = path.join(STYLES_FOLDER, "index.css.mustache");

// Create build directory
shell.mkdir("-p", "build");

// Copy templates
[CONFIG_PATH, INDEX_PATH, STYLES_PATH].forEach(f => {
    shell.cp(path.join(BASE_DEP_FOLDER, f), f + ".example");

    if (!shell.test("-e", f)) {
        shell.cp(path.join(BASE_DEP_FOLDER, f), f);
    }
});

// Copy examples of config files
[
    path.join(CONFIG_FOLDER, "environments.json"),
    path.join(CONFIG_FOLDER, "parameters.json"),
    path.join(CONFIG_FOLDER, "resources.json"),
    path.join(CONFIG_FOLDER, "texts.json")
].forEach(f => {
    shell.cp(path.join(BASE_DEP_FOLDER, f), f + ".example");
});
