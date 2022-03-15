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

export function useFileURL({ file, dataSourceType, uri }: DocumentViewerContainerProps): UseFileUrlHookResult {
    return useMemo(() => {
        if (dataSourceType === "uri") {
            return hookResult("ok", uri);
        }

        if (file?.status !== ValueStatus.Available) {
            return hookResult("loading");
        }

        const url = new URL(file.value.uri);
        const filename = url.searchParams.get("name") ?? "";
        const error = !filename.endsWith(".pdf") ? "Error: unsupported file type" : null;

        if (error) {
            return hookResult("error", error);
        }

        // Setting "target=window" is required to view file in browser window
        url.searchParams.set("target", "window");

        return hookResult("ok", `${url}`);
    }, [file, dataSourceType, uri]);
}
