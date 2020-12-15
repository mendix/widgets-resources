const fs = require("fs");
const { join, resolve } = require("path");
const cwd = process.cwd();
const xmlParser = require("fast-xml-parser");

// For every module mx exports a folder, and in that folder we have bunch of xml's
// which might contains URL field
const individualPageFolders = join(cwd, "tests/testProject/deployment/web/pages/en_US");

// Make an async function that gets executed immediately
function* getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

describe("Screenshots of the pages for", () => {
    beforeAll(() => {
        browser.url("/");
    });

    for (const f of getFiles(individualPageFolders)) {
        const file = fs.readFileSync(f, { encoding: "utf8" });
        if (xmlParser.validate(file) === true) {
            // optional (it'll return an object in case it's not valid)
            const jsonObj = xmlParser.parse(file, { ignoreAttributes: false });
            const url = jsonObj["m:page"]?.["@_url"];
            if (url) {
                it(`matches snapshot for page ${url}`, () => {
                    // Open the page
                    // take screenshot
                    browser.url(url);
                    expect(browser.checkFullPageScreen(url)).toEqual(0);
                });
            }
        }
    }
});
