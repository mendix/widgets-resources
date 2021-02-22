const { rm, cd } = require("shelljs");
const { join } = require("path");
const concurrently = require("concurrently");

const mode = process.argv[2] || "build";
const MX_PROJECT_PATH = process.env.ATLAS_MX_PROJECT_PATH; // should be an absolute path.
const outputProjectDir = MX_PROJECT_PATH ? MX_PROJECT_PATH : join(__dirname, "../tests/testProject");
let outputThemeDir;
let outputThemeSourceDir;
let projectDeployDirWeb;

switch (mode) {
    case "build":
    case "start":
        outputThemeDir = join(outputProjectDir);
        outputThemeSourceDir = join(outputProjectDir, "themesource/atlas_ui_resources");
        projectDeployDirWeb = join(outputProjectDir, "deployment/web");
        break;
    case "release":
        outputThemeDir = join(__dirname, "../dist");
        outputThemeSourceDir = join(__dirname, "../dist/themesource/atlas_ui_resources");
        break;
}

console.info(`Building for ${mode}...`);
const watchArg = mode === "start" ? "--watch" : "";
cd(join(__dirname, ".."));
rm("-rf", outputThemeDir);
concurrently(
    [
        {
            name: "web-theme-content",
            command: `copy-and-watch ${watchArg} "src/theme/web/**/*" "${outputThemeDir}/theme/web"`
        },
        {
            name: "web-themesource-content",
            command: `copy-and-watch ${watchArg} 'src/themesource/atlas_ui_resources/web/**/*' '${outputThemeSourceDir}/web'`
        },
        {
            name: "native-typescript",
            command: `tsc ${watchArg} --project tsconfig.json --outDir '${outputThemeDir}'`
        },
        {
            name: "native-design-properties-and-manifest",
            command: `copy-and-watch ${watchArg} 'src/themesource/atlas_ui_resources/native/**/*.json' '${outputThemeSourceDir}/native'`
        }
    ],
    {
        killOthers: ["failure"]
    }
).then(
    success => {
        console.log("Success", success);
    },
    failure => {
        console.error("Failure", failure);
        process.exit(-1);
    }
);

function command(command) {
    return function (outputPath) {
        return `${command} '${outputPath}'`;
    };
}
