import { DocumentViewerContainerProps } from "../../typings/DocumentViewerProps";
import { useMemo } from "react";
import { ValueStatus } from "mendix";

type GetUrlSuccess = {
    loading: false;
    error: null;
    data: string;
};

type GetUrlError = {
    loading: false;
    error: string;
    data: null;
};

type GetUrlLoading = {
    loading: true;
    data: null;
    error: null;
};

type UseFileUrlHookResult = GetUrlSuccess | GetUrlError | GetUrlLoading;

function hookResult(status: "ok", payload: string): GetUrlSuccess;
function hookResult(status: "error", payload: string): GetUrlError;
function hookResult(status: "loading", payload?: string): GetUrlLoading;
function hookResult(status: unknown, payload: unknown): unknown {
    return {
        loading: status === "loading",
        data: status === "ok" ? payload : null,
        error: status === "error" ? payload : null
    };
}

/**
 * If FileDocument URL is given, then check that "name" attribute is match
 * extension. If given external URL, check that pathname match extension.
 *
 * @param url - Ether external or FileDocument url wrapped with *URL* class;
 * @param ext - file extension to check against
 */
function matchFileExtension(url: URL, ext: string): boolean {
    const filename = url.searchParams.get("name") || url.pathname;

    return filename.endsWith(ext);
}

/**
 * If FileDocument URL is given, tries to set
 * "target" query param to "window" to make sure that file
 * is viewable in browser.
 *
 * @param url - Ether external or FileDocument url wrapped with *URL* class;
 */
function allowFileViewing(url: URL): string {
    // There no reliable way to detect FileDocument url
    // so we relying on path name and "name" search param
    if (url.pathname === "/file" && url.searchParams.get("name")) {
        url.searchParams.set("target", "window");
    }

    return url.toString();
}

/**
 * Check that src is valid URL and it has correct extension.
 *
 * @param src - File source url to check
 */
function ensureSupportedUrl(src: string): string {
    const url = new URL(src);
    if (!matchFileExtension(url, ".pdf")) {
        throw new TypeError("unsupported file type");
    }

    return allowFileViewing(url);
}

function getOriginalUrl({ file, dataSourceType, url }: DocumentViewerContainerProps): string | undefined {
    if (dataSourceType === "file") {
        if (file?.status === ValueStatus.Available) {
            return file.value.uri;
        }
    } else {
        if (url?.status === ValueStatus.Available) {
            return url.value;
        }
    }
}

export function useFileURL(props: DocumentViewerContainerProps): UseFileUrlHookResult {
    return useMemo(() => {
        try {
            const originalUrl = getOriginalUrl(props);
            if (!originalUrl) {
                return hookResult("loading");
            }

            return hookResult("ok", ensureSupportedUrl(originalUrl));
        } catch (error) {
            return hookResult("error", `${error}`);
        }
    }, [props.file, props.dataSourceType, props.url]);
}
