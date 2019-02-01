const path = require("path");
const ghauth = require("ghauth");
const ghRelease = require("gh-release");

const ghauthOpts = {
    configName: "gh-release",
    scopes: ["repo"],
    note: "gh-release",
    userAgent: "gh-release"
};

ghauth(ghauthOpts, (error, auth) => {
    if (error) {
        return handleError(error);
    }
    releaseWithAuth(auth);
});

function releaseWithAuth(auth) {
    const pkg = require(path.resolve(process.cwd(), "package.json"));
    const tagName = `${pkg.name}@${pkg.version}`;
    const assets = pkg.config && pkg.config.widgetName ? [`dist/release/${pkg.config.widgetName}.mpk`] : false;

    const options = {
        tag_name: tagName,
        name: tagName,
        assets,
        auth
    };

    ghRelease(options, (error, result) => {
        if (error) {
            return handleError(error);
        }
        console.log(result.html_url);
        process.exit(0);
    });
}

function handleError(error) {
    const msg = error.msg || error;
    console.error(msg);
    process.exit(1);
}
