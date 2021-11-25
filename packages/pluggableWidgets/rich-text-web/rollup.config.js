// import { join } from "path";
// import command from "rollup-plugin-command";
// import { cp } from "shelljs";

export default args => {
    // const outDir = join(__dirname, "dist/tmp/widgets/ckeditor");
    const result = args.configDefaultConfig;

    return result.map(config => ({
        ...config
        // external: ["ckeditor4"]
    }));
};
