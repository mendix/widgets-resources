export class UrlHelper {

    static getStaticResourceUrlFromPath(path: string) {
        if (this.startsWith(path, "data:")) return path;
        // Static resource path should already contain cachebust from the modeler.
        return mx.appUrl + path;
    }

    static getStaticResourceUrl(url: string) {
        if (this.startsWith(url, "data:")) return url;

        if (!/^\w+:\/\//.test(url)) {
            url = this.getStaticResourceUrlFromPath(url);
        }

        const cacheBust = mx.server.getCacheBust();

        // Only add a cache bust if it's not already there and it's a Mendix url
        if (this.startsWith(url, mx.appUrl) && !this.endsWith(url, cacheBust)) {
            url += (/\?/.test(url) ? "&" : "?") + cacheBust;
        }

        return url;
    }

    static getDynamicResourcePath(guid: string, changedDate: number, isThumbnail: boolean) {
        let url = "file?" + [
                "guid=" + guid,
                "changedDate=" + changedDate
            ].join("&");

        if (isThumbnail) url += "&thumb=true";

        return url;
    }

    static getDynamicResourceUrl(guid: string, changedDate: number, isThumbnail = false) {
        return mx.remoteUrl + this.getDynamicResourcePath(guid, changedDate, isThumbnail);
    }

    private static startsWith(searchString: string, prefix: string) {
        return searchString.indexOf(prefix) === 0;
    }

    private static endsWith(searchString: string, suffix: string) {
        return searchString.indexOf(suffix, searchString.length - suffix.length) !== -1;
    }
}
