import { join } from "path";

export default args => {
    const result = args.configDefaultConfig;
    result[0].output.file = join(__dirname, "dist/tmp/widgets/com/mendix/widget/custom/Maps/Maps.js");
    return result;
};
