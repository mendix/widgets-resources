const fs = require("fs");
const { join, resolve } = require("path");
const cwd = process.cwd();
const xmlParser = require("fast-xml-parser");

const testPageFolders = process.env.ATLAS_MX_PROJECT_PATH
    ? join(process.env.ATLAS_MX_PROJECT_PATH, "deployment/web/pages/en_US")
    : join(cwd, "tests/testProject/deployment/web/pages/en_US");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    await pageUrls(testPageFolders);
}

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
    const pageUrlsJSON = JSON.stringify(pageUrls);
    fs.writeFileSync("./cypress/fixtures/pagesCollection.json", pageUrlsJSON);

    return pageUrls;
}
