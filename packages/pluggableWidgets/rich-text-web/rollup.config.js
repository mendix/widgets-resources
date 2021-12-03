// import { join } from "path";
// import command from "rollup-plugin-command";
// import { cp } from "shelljs";
//
import json from "@rollup/plugin-json";

export default args => {
    // const outDir = join(__dirname, "dist/tmp/widgets/ckeditor");
    const result = args.configDefaultConfig;

    return result.map(config => ({
        ...config,
        plugins: [
            ...config.plugins,
            json()
            // command([
            //     () => {
            //         cp("-R", join(__dirname, "../../../node_modules/ckeditor4"), outDir);
            //     }
            // ])
        ]
    }));
};
