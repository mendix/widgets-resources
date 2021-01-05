const fs = require("fs");
const { join, resolve } = require("path");
const cwd = process.cwd();
const xmlParser = require("fast-xml-parser");

// For every module mx exports a folder, and in that folder we have bunch of xml's
// which might contain an URL field
const testPageFolders = join(cwd, "tests/testProject/deployment/web/pages/en_US");
const screenShotsFolder = join(cwd, "tests/e2e/screenshot-baseline");

// TODO [https://mendix.atlassian.net/browse/WT-3106]: Cannot save big screens due to wdio-image-service/webdriver-image-comparison/canvas failiure
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

function* getFilePaths(dir) {
    const directory = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of directory) {
        const filePathRes = resolve(dir, file.name);
        if (file.isDirectory()) {
            yield* getFilePaths(filePathRes);
        } else {
            yield filePathRes;
        }
    }
}

function pageUrls(folder) {
    const pageUrls = [];
    for (const filePath of getFilePaths(folder)) {
        const file = fs.readFileSync(filePath, { encoding: "utf8" });
        if (xmlParser.validate(file) === true) {
            const jsonObj = xmlParser.parse(file, { ignoreAttributes: false });
            const url = jsonObj["m:page"]?.["@_url"];
            if (url) {
                pageUrls.push(url);
            }
        }
    }
    return pageUrls;
}

function cleanUnusedScreenshotBases() {
    const urls = pageUrls(testPageFolders);
    for (const filePath of getFilePaths(screenShotsFolder)) {
        console.log(urls.filter(url => filePath.includes(url)).length);
        if (urls.filter(url => filePath.includes(url)).length === 0) {
            console.log(`${filePath} is deprecated and will be deleted`);
            fs.rmSync(filePath);
        }
    }
}

describe("Screenshots of the pages for", () => {
    beforeAll(() => {
        browser.url("/");
    });

    for (const url of pageUrls(testPageFolders)) {
        if (url) {
            it(`matches snapshot for page ${url}`, () => {
                if (!pagesToSkip.includes(url)) {
                    browser.url(url); // Open the page
                    expect(
                        browser.checkFullPageScreen(url, {
                            disableCSSAnimation: true,
                            ignoreAntialiasing: true
                        }) // take screenshot
                    ).toEqual(0);
                }
            });
        }
    }

    afterAll(() => {
        cleanUnusedScreenshotBases();
    });
});
