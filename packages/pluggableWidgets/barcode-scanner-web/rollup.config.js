export default args => {
    const result = args.configDefaultConfig;
    result.forEach(config => {
        const onwarn = config.onwarn;
        config.onwarn = warning => {
            // TODO: The library itself throws a lot of esm module related errors on compilation.
            // For now they don't seem related to us and everything still works, so I ignored
            // all of them, but this should not catch every error and just throw it into the abyss.
            if (warning.loc.file.includes("@zxing/library")) {
                return;
            }
            onwarn(warning);
        };
    });
    return result;
};
