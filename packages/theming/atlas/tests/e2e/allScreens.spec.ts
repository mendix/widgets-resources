const fs = require("fs");
const { join, resolve } = require("path");
const cwd = process.cwd();
const xmlParser = require("fast-xml-parser");

// For every module mx exports a folder, and in that folder we have bunch of xml's
// which might contain an URL field
const testPageFolders = process.env.ATLAS_MX_PROJECT_PATH
    ? join(process.env.ATLAS_MX_PROJECT_PATH, "deployment/web/pages/en_US")
    : join(cwd, "tests/testProject/deployment/web/pages/en_US");
const screenShotsFolder = join(cwd, "tests/e2e/screenshot-baseline");

// TODO [https://mendix.atlassian.net/browse/WT-3106]: Cannot save big screens due to wdio-image-service/webdriver-image-comparison/canvas failure
// Need to keep the list until this fixed: https://github.com/wswebcreation/webdriver-image-comparison/issues/60
const pagesToSkip = ["/p/chat-fullheight/{Id}", "/p/chat-variants/{Id}", "/p/treeviews"];

// Mostly the pages with progressbar fails since it is not CSS animations for web -_-. So disableCSSAnimation wont work.
// This ends up having unstable progress circle percentage
const pagesWithTimeout = [
    "/p/alerts",
    "/p/progress-circles",
    "/p/maps",
    "/p/web-grid",
    "/p/web-dashboard-actioncenter",
    "/p/web-dashboard-transactions",
    "/p/web-detail-timeline"
];

describe("Screenshots of the pages for", () => {
    for (const url of pageUrls(testPageFolders)) {
        if (!pagesToSkip.includes(url)) {
            it(`matches snapshot for page ${url}`, () => {
                browser.url(url); // Open the page
                browser.setWindowRect(0, 0, 1360, 1020);

                // These widgets are causing unstable tests due to their nature while loading the screen
                const sprintrFeedbackWidget = $(".sprintrFeedback__sidebar");
                const mapsWidget = $(".widget-maps");
                const chartBar = $(".modebar");

                if (pagesWithTimeout.includes(url)) {
                    browser.pause(10000);
                }

                $("#content").waitForDisplayed({ timeout: 30000 });

                browser.saveElement($("#content"), url, {
                    removeElements: [sprintrFeedbackWidget, mapsWidget, chartBar],
                    disableCSSAnimation: true,
                    hideScrollBars: true
                });
                expect(
                    browser.checkElement($("#content"), url, {
                        removeElements: [sprintrFeedbackWidget, mapsWidget, chartBar],
                        disableCSSAnimation: true,
                        hideScrollBars: true
                    })
                ).toEqual(0);
            });
        }
    }
});

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
