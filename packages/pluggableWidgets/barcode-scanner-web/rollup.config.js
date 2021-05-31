import replace from "@rollup/plugin-replace";

export default args => {
    const result = args.configDefaultConfig;
    result.forEach(config => {
        const onwarn = config.onwarn;
        config.onwarn = warning => {
            // The library itself throws a lot of esm module related errors on compilation.
            // For now they don't seem related to us and everything still works, so I ignored them.
            if (
                warning.loc &&
                warning.loc.file.includes("@zxing/library") &&
                (warning.code === "THIS_IS_UNDEFINED" || warning.code === "SOURCEMAP_ERROR")
            ) {
                return;
            }
            onwarn(warning);
        };
        const plugins = config.plugins || [];
        config.plugins = [
            /**
             * https://github.com/zxing-js/library/blob/99525fbf71fc4902424673067a120b0c09197c27/src/browser/BrowserCodeReader.ts#L432-L444
             * We remove all these specific `console.warn`s because otherwise they end up in Mendix Studio Pro console, but
             * the warnings themselves are not interesting for Mendix developers. I tried to prevent this function from being called unnecessary,
             * but the library itself calls it twice just in case, but that means a warning is always logged which is not what we want.
             */
            replace({
                values: {
                    "console.warn('Trying to play video that is already playing.');": "",
                    "console.warn('It was not possible to play the video.');": ""
                },
                delimiters: ["", ""],
                preventAssignment: true
            }),
            ...plugins
        ];
    });
    return result;
};
