export default args => {
    const result = args.configDefaultConfig;
    result.forEach(config => {
        const onwarn = config.onwarn;
        config.onwarn = warning => {
            // The library itself throws a lot of esm module related errors on compilation.
            // For now they don't seem related to us and everything still works, so I ignored them.
            if (
                warning.loc.file.includes("@zxing/library") &&
                (warning.code === "THIS_IS_UNDEFINED" || warning.code === "SOURCEMAP_ERROR")
            ) {
                return;
            }
            onwarn(warning);
        };
    });
    return result;
};
