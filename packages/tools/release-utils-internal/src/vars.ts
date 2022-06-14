// As env var is alays string, we expect it to be "true",
// converting eny other value to false.
export const skipDepsBuild = (): boolean => process.env.MX_TOOLS_SKIP_DEPS_BUILD === "true";

// NOTE: this is not a JS regex but C# and it passed as flag.
export const mxutilExcludeFilesRegEx = (): string => {
    return process.env.MX_TOOLS_EXCLUDE_FILES_ON_EXPORT ?? "^(resources|userlib)/.*";
};

export const isDebug = (): boolean => typeof process.env.DEBUG !== "undefined";
