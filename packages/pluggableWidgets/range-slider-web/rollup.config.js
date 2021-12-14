import { join } from "path";

export default args => {
    const result = args.configDefaultConfig;
    const [jsConfig, mJsConfig] = result;

    // We change the output because range slider widget package was wrongly named with uppercase R and S in the past.
    jsConfig.output.file = join(__dirname, "dist/tmp/widgets/com/mendix/widget/custom/RangeSlider/RangeSlider.js");
    mJsConfig.output.file = join(__dirname, "dist/tmp/widgets/com/mendix/widget/custom/RangeSlider/RangeSlider.mjs");

    return result;
};
