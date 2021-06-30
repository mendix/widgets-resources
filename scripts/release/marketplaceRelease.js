const nodefetch = require("node-fetch");
const { join } = require("path");

const config = {
    appStoreUrl: "https://appstore.home.mendix.com/rest/packagesapi/v2"
};

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const {
        widgetName,
        version,
        marketplace: { studioProMinimumVersion, marketplaceId }
    } = require(join(process.cwd(), "package.json"));

    if (!widgetName || !version || !studioProMinimumVersion || !marketplaceId || !version.includes(".")) {
        throw new Error("Widget does not define expected keys in its package.json");
    }

    await uploadModuleToAppStore(widgetName, marketplaceId, version, studioProMinimumVersion);
}

async function uploadModuleToAppStore(widgetName, marketplaceId, version, studioProMinimumVersion) {
    try {
        const postResponse = await createDraft(marketplaceId, version, studioProMinimumVersion);
        await publishDraft(postResponse.Version.VersionUUID);
        console.log(`Successfully uploaded ${widgetName} to the Mendix Marketplace.`);
    } catch (error) {
        error.message = `Failed uploading module to appstore with error: ${error.message}`;
        throw error;
    }
}

async function getGithubAssetUrl() {
    console.log("Retrieving informations from Github Tag");
    const request = await nodefetch("https://api.github.com/repos/mendix/widgets-resources/releases?per_page=5", {
        method: "GET"
    });
    const data = (await request.json()) ?? [];
    const releaseId = data.filter(info => info.tag_name === process.env.TAG)?.pop()?.id;
    if (releaseId) {
        const assetsRequest = await nodefetch(
            `https://api.github.com/repos/mendix/widgets-resources/releases/${releaseId}/assets`,
            { method: "GET" }
        );
        const assetsData = (await assetsRequest.json()) ?? [];
        const downloadUrl = assetsData.filter(asset => asset.name.endsWith(".mpk"))?.pop()?.browser_download_url;
        if (!downloadUrl) {
            throw new Error("Could not retrieve MPK url from GitHub tag");
        }
        return downloadUrl;
    } else {
        throw new Error("Could not retrieve release tag information from GitHub");
    }
}

async function createDraft(marketplaceId, version, studioProMinimumVersion) {
    console.log(`Creating draft in the Mendix Marketplace..`);
    const url = `${config.appStoreUrl}/packages/${marketplaceId}/version`;
    try {
        const [major, minor, patch] = version.split(".");
        const assetUrl = await getGithubAssetUrl();
        const body = {
            VersionMajor: major ?? 1,
            VersionMinor: minor ?? 0,
            VersionPatch: patch ?? 0,
            StudioProVersion: studioProMinimumVersion,
            IsSourceGitHub: "true",
            GithubRepo: {
                UseReadmeForDoc: false,
                ArtifactURL: assetUrl
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
        console.error(error);
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
        throw new Error(`Fetching Failed. Unhandled status code: ${response.status}`);
    }
}
