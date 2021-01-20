const { rm, cd } = require("shelljs");
const { join } = require("path");
const concurrently = require("concurrently");

const mode = process.argv[2] || "build";
const MX_PROJECT_PATH = process.env.ATLAS_MX_PROJECT_PATH; // should be an absolute path.
let outputProjectDir = MX_PROJECT_PATH ? MX_PROJECT_PATH : join(__dirname, "../tests/testProject");
let outputThemeDir;
let outputThemeSourceDir;
let projectDeployDirWeb;

switch (mode) {
    case "build":
    case "start":
        outputThemeDir = join(outputProjectDir, "theme");
        outputThemeSourceDir = join(outputProjectDir, "themesource");
        projectDeployDirWeb = join(outputProjectDir, "deployment/web");
        break;
    case "release":
        outputThemeDir = join(__dirname, "../dist/theme");
        outputThemeSourceDir = join(__dirname, "../dist/themesource");
        break;
}

console.info(`Building for ${mode}...`);
const watchArg = mode === "start" ? "--watch" : "";
cd(join(__dirname, ".."));
rm("-rf", outputThemeDir);
concurrently(
    [
        {
            name: "web-content",
            command: `copy-and-watch ${watchArg} "src/theme/web/**/*" "${outputThemeDir}/web"`
        },
        {
            name: "web-sass",
            command: `copy-and-watch ${watchArg} 'src/themesource/web/**/*.scss' '${outputThemeSourceDir}/web'`
        },
        {
            name: "native-typescript",
            command: `tsc ${watchArg} --project tsconfig.json --outDir '${outputProjectDir}'`
        },
        {
            name: "design-properties",
            command: `copy-and-watch ${watchArg} 'src/themesource/**/design-properties.json' '${outputThemeSourceDir}'`
        },
        {
            name: "manifests",
            command: `copy-and-watch 'src/themesource/**/manifest.json' '${outputThemeSourceDir}'`
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
