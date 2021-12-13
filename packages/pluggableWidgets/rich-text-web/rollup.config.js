import json from "@rollup/plugin-json";

export default args => {
    const result = args.configDefaultConfig;

    return result.map(config => ({
        ...config,
        plugins: [...config.plugins, json()]
    }));
};
