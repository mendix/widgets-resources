import nodefetch from "node-fetch";

const config = {
    appStoreUrl: "https://appstore.home.mendix.com/rest/packagesapi/v2"
};

export async function fetchMarketplace<T extends object>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body: object
): Promise<Promise<T>> {
    return fetch<T>(method, `${config.appStoreUrl}/${url}`, body, {
        "Mendix-Username": process.env.MARKETPLACE_USERNAME,
        "Mendix-ApiKey": process.env.MARKETPLACE_API_KEY
    });
}

export async function fetch<T extends object>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: object,
    additionalHeaders?: object
): Promise<Promise<T>> {
    let response;
    const httpsOptions = {
        method,
        redirect: "follow",
        headers: {
            Accept: "application/json",
            ...additionalHeaders,
            ...(body && { "Content-Type": "application/json" })
        },
        body
    };

    console.log(`Fetching URL (${method}): ${url}`);
    try {
        response = await nodefetch(url, httpsOptions);
    } catch (error) {
        throw new Error(
            `An error occurred while retrieving data from ${url}. Technical error: ${(error as Error).message}`
        );
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
