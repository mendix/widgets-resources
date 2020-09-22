const { exec } = require("shelljs");

function build() {
    const mode = process.argv[2] || "production";
    const MX_PROJECT_PATH = process.env.ATLAS_MX_PROJECT_PATH;

    if (mode === "production") {
        console.info("Building for production...");
        exec("shx rm -rf ./dist");
        exec("shx mkdir -p ./dist/theme/styles/web/css/fonts");
        exec("shx cp ./src/web/sass/core/_legacy/bootstrap/fonts/* ./dist/theme/styles/web/css/fonts");
        exec("shx cp -R ./content/. ./dist/theme/");
        exec(
            "sass --embed-sources --no-charset -s compressed ./src/web/sass/main.scss ./dist/theme/styles/web/css/main.css"
        );
        exec("tsc -p ./tsconfig.json");
        console.info("Done.");
    } else {
        console.info("Building for development...");
        exec("shx rm -rf ./dist");
        exec("shx mkdir -p ./dist/theme/styles/web/css/fonts");
        exec("shx cp ./src/web/sass/core/_legacy/bootstrap/fonts/* ./dist/theme/styles/web/css/fonts");
        exec(
            "concurrently -n 'content,resources,sass,tsc,workingProject'" +
                " 'copy-and-watch --watch content/* dist/theme'" +
                " 'copy-and-watch --watch content/resources/* dist/theme/resources'" +
                " 'sass --watch --embed-sources --no-charset ./src/web/sass/main.scss ./dist/theme/styles/web/css/main.css'" +
                " 'tsc -w -p ./tsconfig.json'" +
                ` 'copy-and-watch --watch dist/theme ${MX_PROJECT_PATH}/theme'`
        );
    }
}

build();
