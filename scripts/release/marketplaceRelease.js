const nodefetch = require("node-fetch");
const { join } = require("path");

const config = {
    appStoreUrl: "https://appstore.home.mendix.com/rest/packagesapi/v2"
};

main().catch(e => {
    console.error(e);
    process.exit();
});

async function main() {
    const pkgPath = join(process.cwd(), "package.json");
    const {
        name,
        widgetName,
        version,
        marketplace: { minimumMXVersion, marketplaceId }
    } = require(pkgPath);

    console.log(`Starting release process for tag ${process.env.TAG}`);

    const pkgName = name ?? widgetName;
    if (!pkgName || !version || !minimumMXVersion || !marketplaceId || !version.includes(".")) {
        throw new Error(`${pkgPath} does not define expected keys.`);
    }

    if (version.split(".").length !== 3) {
        throw new Error(`${pkgPath} version is not defined correctly.`);
    }

    await uploadModuleToAppStore(pkgName, marketplaceId, version, minimumMXVersion);
}

async function uploadModuleToAppStore(pkgName, marketplaceId, version, minimumMXVersion) {
    try {
        const postResponse = await createDraft(marketplaceId, version, minimumMXVersion);
        await publishDraft(postResponse.Version.VersionUUID);
        console.log(`Successfully uploaded ${pkgName} to the Mendix Marketplace.`);
    } catch (error) {
        error.message = `Failed uploading ${pkgName} to appstore with error: ${error.message}`;
        throw error;
    }
}

async function getGithubAssetUrl() {
    console.log("Retrieving informations from Github Tag");
    const request = await fetch("GET", "https://api.github.com/repos/mendix/widgets-resources/releases?per_page=10");
    const data = (await request) ?? [];
    const releaseId = data.filter(info => info.tag_name === process.env.TAG)?.pop()?.id;
    if (!releaseId) {
        throw new Error(`Could not find release with tag ${process.env.TAG} on GitHub`);
    }
    const assetsRequest = await fetch(
        "GET",
        `https://api.github.com/repos/mendix/widgets-resources/releases/${releaseId}/assets`
    );
    const assetsData = (await assetsRequest) ?? [];
    const downloadUrl = assetsData.filter(asset => asset.name.endsWith(".mpk"))?.pop()?.browser_download_url;
    if (!downloadUrl) {
        throw new Error(`Could not retrieve MPK url from GitHub release with tag ${process.env.TAG}`);
    }
    return downloadUrl;
}

async function createDraft(marketplaceId, version, minimumMXVersion) {
    console.log(`Creating draft in the Mendix Marketplace..`);
    console.log(`ID: ${marketplaceId} - Version: ${version} - MXVersion: ${minimumMXVersion}`);
    const url = `${config.appStoreUrl}/packages/${marketplaceId}/version`;
    const [major, minor, patch] = version.split(".");
    try {
        const body = {
            VersionMajor: major ?? 1,
            VersionMinor: minor ?? 0,
            VersionPatch: patch ?? 0,
            StudioProVersion: minimumMXVersion.split(".").slice(0, 3).join("."),
            IsSourceGitHub: "true",
            GithubRepo: {
                UseReadmeForDoc: false,
                ArtifactURL: await getGithubAssetUrl()
            }
        };

        return fetch("POST", url, JSON.stringify(body));
    } catch (error) {
        error.message = `Failed creating draft in the appstore with error: ${error.message}`;
        throw error;
    }
}

function publishDraft(UUID) {
    console.log(`Publishing draft in the Mendix Marketplace..`);
    const url = `${config.appStoreUrl}/version/${UUID}/publish`;
    try {
        return fetch("PUT", url);
    } catch (error) {
        error.message = `Failed publishing draft in the appstore with error: ${error.message}`;
        throw error;
    }
}

async function fetch(method, url, body) {
    let response;
    const httpsOptions = {
        method,
        redirect: "follow",
        headers: {
            Accept: "application/json",
            "Mendix-Username": process.env.MARKETPLACE_USERNAME,
            "Mendix-ApiKey": process.env.MARKETPLACE_API_KEY
        },
        body: undefined
    };

    if (body) {
        httpsOptions.body = body;
        httpsOptions.headers["Content-Type"] = "application/json";
    }

    console.log(`Fetching URL (${method}): ${url}`);
    try {
        response = await nodefetch(url, httpsOptions);
    } catch (error) {
        throw new Error(`An error occurred while retrieving data from ${url}. Technical error: ${error.message}`);
    }
    console.log(`Response status Code ${response.status}`);
    if (response.status === 409) {
        throw new Error(
            `Fetching Failed (Code ${response.status}). Possible solution: Check & delete drafts in Mendix Marketplace.`
        );
    } else if (response.status === 503) {
        throw new Error(`Fetching Failed. "${url}" is unreachable (Code ${response.status}).`);
    } else if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Fetching Failed (Code ${response.status}). ${response.statusText}`);
    } else if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Fetching Failed (Code ${response.status}). ${response.statusText}`);
    }
}
