const { rm, cd } = require("shelljs");
const { join } = require("path");
const concurrently = require("concurrently");

const mode = process.argv[2] || "production";
const MX_PROJECT_PATH = process.env.ATLAS_MX_PROJECT_PATH; // should be an absolute path.
const outputDir =
    mode !== "production" && MX_PROJECT_PATH ? join(MX_PROJECT_PATH, "theme") : join(__dirname, "../dist/theme");
const projectDeployDir = mode !== "production" && MX_PROJECT_PATH ? join(MX_PROJECT_PATH, "deployment/web") : null;

console.info(`Building for ${mode}...`);
const watchArg = mode !== "production" ? "--watch" : "";
const compressArg = mode === "production" ? "--style compressed" : "";
const copyAndWatchFonts = command(`copy-and-watch ${watchArg} 'src/web/sass/core/_legacy/bootstrap/fonts/*'`);
const copyAndWatchContent = command(`copy-and-watch ${watchArg} 'content/**/*'`);
const compileSass = command(`sass ${watchArg} --embed-sources ${compressArg} --no-charset src/web/sass/main.scss`);

cd(join(__dirname, ".."));
rm("-rf", outputDir);
concurrently(
    [
        {
            name: "content-theme",
            command: copyAndWatchContent(outputDir)
        },
        {
            name: "web-sass-and-manifest-theme",
            command: `copy-and-watch ${watchArg} 'src/web/sass/**/*' '${outputDir}/styles/web/sass'`
        },
        {
            name: "native-manifest-theme",
            command: `copy-and-watch ${watchArg} src/native/ts/core/manifest.json '${outputDir}/styles/native/core'`
        },
        {
            name: "fonts-theme",
            command: copyAndWatchFonts(`${outputDir}/styles/web/css/fonts`)
        },
        {
            name: "sass-theme",
            command: compileSass(`${outputDir}/styles/web/css/main.css`)
        },
        {
            name: "tsc-theme",
            command: `tsc ${watchArg} --project tsconfig.json --outDir '${outputDir}/styles/native'`
        }
    ].concat(
        projectDeployDir
            ? [
                  {
                      name: "fonts-deployment",
                      command: copyAndWatchFonts(`${projectDeployDir}/styles/web/css/fonts`)
                  },
                  {
                      name: "sass-deployment",
                      command: compileSass(`${projectDeployDir}/styles/web/css/main.css`)
                  },
                  {
                      name: "content-deployment",
                      command: copyAndWatchContent(projectDeployDir)
                  }
              ]
            : []
    ),
    {
        prefix: "name",
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
