import { execSync } from "child_process";
import ghRelease from "gh-release";
import ghauth, { AuthOptions, TokenData } from "ghauth";

main().catch(handleError);

async function main() {
    pushTagsIfNeeded();
    releaseWithAuth(await getAuth());
}

function pushTagsIfNeeded() {
    execSync("git diff --exit-code --quiet origin/master..master");
    execSync("git push --follow-tags");
}

function getAuth() {
    return new Promise<TokenData>((resolve, reject) => {
        const options: AuthOptions = {
            configName: "gh-release",
            scopes: ["repo"],
            note: "gh-release",
            userAgent: "gh-release"
        };

        ghauth(options, (error, auth) => (error ? reject(error) : resolve(auth)));
    });
}

function releaseWithAuth(auth: TokenData) {
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

    ghRelease(options, (error: string, result: { html_url: string }) => {
        if (error) {
            return handleError(error);
        }
        console.log(result.html_url);
        process.exit(0);
    });
}

function handleError(error: { msg: string } | string) {
    const msg = typeof error === "object" ? error.msg : error;
    console.error(msg);
    process.exit(1);
}
