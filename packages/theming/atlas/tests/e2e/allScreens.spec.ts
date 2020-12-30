const fs = require("fs");
const { join, resolve } = require("path");
const cwd = process.cwd();
const xmlParser = require("fast-xml-parser");

// For every module mx exports a folder, and in that folder we have bunch of xml's
// which might contains URL field
const individualPageFolders = join(cwd, "tests/testProject/deployment/web/pages/en_US");

// Cannot save big screens due to wdio-image-service/webdriver-image-comparison/canvas failiure
// Need to keep the list until this fixed: https://github.com/wswebcreation/webdriver-image-comparison/issues/60
const pagesToSkip = [
    "/p/datagrid-manyrows",
    "/p/chat-fullheight/{Id}",
    "/p/chat-variants/{Id}",
    "/p/pt_dashboard-metrics",
    "/p/pt_dashboard-user-detail",
    "/p/pt_tablet_dashboard-metrics",
    "/p/pt_tablet_dashboard-user-detail"
];

function* getFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const res = resolve(dir, file.name);
        if (file.isDirectory()) {
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
                    if (!pagesToSkip.includes(url)) {
                        browser.url(url); // Open the page
                        expect(
                            browser.checkFullPageScreen(url, {
                                disableCSSAnimation: true,
                                ignoreAntialiasing: true,
                                ignoreTransparentPixel: true,
                                largeImageThreshold: 3000
                            }) // take screenshot
                        ).toEqual(0);
                    }
                });
            }
        }
    }
});
