import commonjs from "@rollup/plugin-commonjs";

export default args => {
    const result = args.configDefaultConfig;
    result.forEach(config => {
        const plugins = config.plugins || [];
        config.plugins = [
            commonjs({
                extensions: [".js"],
                transformMixedEsModules: true,
                // `react-modal` throws warnings in `react-lifecycles-compat.es.js` due to some broken compiliation
                // that causes the default export to be missing. Using this commonjs configuration,
                requireReturnsDefault: id => {
                    return !id.includes("react-lifecycles-compat");
                }
            }),
            ...plugins
        ];
    });
    return result;
};
