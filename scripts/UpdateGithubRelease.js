const ghauth = require("ghauth");
const ghRelease = require("gh-release");
const { exec } = require("child_process");

try {
    main();
} catch (error) {
    handleError(error);
}

async function main() {
    await pushTagsIfNeeded();
    const auth = await getAuth();
    await releaseWithAuth(auth);
}

function pushTagsIfNeeded() {
    return new Promise((resolve, reject) => {
        exec("git diff --exit-code --quiet origin/master..master", error => {
            if (!error) {
                return resolve();
            }
            exec("git push --follow-tags", error => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    });
}

function getAuth() {
    return new Promise((resolve, reject) => {
        const ghauthOptions = {
            configName: "gh-release",
            scopes: ["repo"],
            note: "gh-release", // asd
            userAgent: "gh-release"
        };

        ghauth(ghauthOptions, (error, auth) => {
            if (error) {
                return reject(error);
            }
            resolve(auth);
        });
    });
}

function releaseWithAuth(auth) {
    const tagName = `${process.env.npm_package_name}@${process.env.npm_package_version}`;
    const assets = process.env.npm_package_config_widgetName
        ? [`dist/release/${process.env.npm_package_config_widgetName}.mpk`]
        : false;

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
