import { DocumentViewerContainerProps } from "../../typings/DocumentViewerProps";
import { useMemo } from "react";
import { ValueStatus } from "mendix";

type UseFileUrlHookResult =
    | {
          loading: true;
          data: null;
          error: null;
      }
    | {
          loading: false;
          data: string;
          error: null;
      }
    | {
          loading: false;
          data: null;
          error: string;
      };

export function useFileURL({ file, dataSourceType, uri }: DocumentViewerContainerProps): UseFileUrlHookResult {
    return useMemo(() => {
        if (dataSourceType === "uri") {
            return {
                loading: false,
                data: uri,
                error: null
            };
        }

        if (file?.status !== ValueStatus.Available) {
            return {
                loading: true,
                data: null,
                error: null
            };
        }

        const url = new URL(file.value.uri);
        const filename = url.searchParams.get("name") ?? "";
        const error = !filename.endsWith(".pdf") ? "Error: unsupported file type" : null;

        if (error) {
            return {
                loading: false,
                data: null,
                error
            };
        }

        url.searchParams.set("target", "window");

        return {
            loading: false,
            data: `${url}`,
            error: null
        };
    }, [file, dataSourceType, uri]);
}
