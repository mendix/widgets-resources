/* eslint no-console: 0 */
import { promises as fs, existsSync, createWriteStream, mkdirSync } from "fs";
import { join } from "path";
import { get } from "http";
import { decompress } from "targz";
import { spawnSync } from "child_process";

const cwd = process.cwd();
const buildPath = join(cwd, "dist/build/");

let mendixVersion = "";
let moduleVersion = "";
let projectPath = "";
let moduleName = "";
let repoMxBuildUrl = "";
const monoPath = "/Library/Frameworks/Mono.framework/Versions/Current/Commands";
// For local tests of unreleased mx versions: set useLocaleUtils true, and path to Mendix folder
const useLocaleUtils = false;
const localUtilPath = "/Volumes/[C] Windows10Enterprise/Program Files/Mendix/";

main().catch(console.error);

async function main(): Promise<void> {
    /* eslint-disable-next-line */
    const packageContent: any = require(join(cwd, "package.json"));
    moduleVersion = packageContent.version;
    if (
        !packageContent.config ||
        !packageContent.config.projectName ||
        !packageContent.config.moduleName ||
        !packageContent.config.testProjects ||
        !packageContent.config.testProjects.length ||
        !packageContent.config.testProjects[0].mendixVersion ||
        !packageContent.config.testProjects[0].path
    ) {
        console.error("No module export configuration found in package.json");
        return;
    }
    projectPath = join(packageContent.config.testProjects[0].path, packageContent.config.projectName);
    mendixVersion = packageContent.config.testProjects[0].mendixVersion;
    moduleName = packageContent.config.moduleName;

    repoMxBuildUrl = `http://cdn.mendix.com/runtime/mxbuild-${mendixVersion}.tar.gz`;

    console.info("Start exporting module", packageContent.config.moduleName);
    await getMxBuild();
    createModulePackage();
    console.log("Exporting done");
}

function createModulePackage(): void {
    console.log("createModulePackage");
    const buildBase = useLocaleUtils ? localUtilPath : buildPath;
    const utilPath = join(buildBase, mendixVersion, "modeler/mxutil.exe");
    if (!existsSync(utilPath)) {
        console.error("mxutil could not be found at path", utilPath);
        return;
    }
    const projectFullPath = join(cwd, projectPath);
    if (!existsSync(projectFullPath)) {
        console.error("Mendix project not found at path", projectFullPath);
        return;
    }
    const dest = join("dist", moduleVersion, "module");
    if (!existsSync(dest)) {
        mkdirSync(dest, { recursive: true });
    }
    const parameters = [
        "create-module-package",
        "--filter-required-libs",
        "--exclude-files=resources/.*",
        `--package-dir=${dest}`,
        projectFullPath,
        moduleName
    ];
    const isWin = process.platform === "win32";
    if (isWin) {
        const result = spawnSync(utilPath, parameters);
        console.log(String(result.stdout));
    } else {
        if (!existsSync(monoPath)) {
            console.error("mono is not available at", monoPath);
            return;
        }
        const result = spawnSync(join(monoPath, "mono"), [utilPath, ...parameters]);
        console.log(String(result.stdout));
    }
}

async function getMxBuild(): Promise<void> {
    if (useLocaleUtils) {
        return Promise.resolve();
    }
    const destination = join(buildPath, mendixVersion);

    console.info("getMxBuild", destination);
    if (existsSync(destination)) {
        console.info("MxBuild already there");
        return Promise.resolve();
    }
    await fs.mkdir(buildPath, { recursive: true });
    const file = join(buildPath, `${mendixVersion}.tar.gz`);
    await download(repoMxBuildUrl, file);
    const ignorePath = join(destination, "runtime");
    await unzip(file, destination, ignorePath);
}

function unzip(src: string, dest: string, ignore: string): Promise<void> {
    console.info("unzip", src, dest);
    return new Promise((resolve, reject) => {
        decompress(
            {
                src,
                dest,
                tar: {
                    ignore: name => name.startsWith(ignore)
                }
            },
            error => {
                if (error) {
                    return reject(error);
                }
                console.log("Decompress done");
                resolve();
            }
        );
    });
}

function download(url: string, destination: string): Promise<void> {
    console.info("download", url, destination);
    if (existsSync(destination)) {
        console.info("Already downloaded");
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const file = createWriteStream(destination);
        get(url, response => {
            if (response.statusCode !== 200) {
                fs.unlink(destination);
                reject(new Error("File could not be downloaded status code" + response.statusCode));
            }
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                resolve();
            });
        })
            .on("error", error => {
                fs.unlink(destination);
                reject(error);
            })
            .on("response", data => {
                const length = parseInt(data.headers["content-length"] || "0", 10);
                const total = Math.round((length / (1024 * 1024)) * 10) / 10;
                console.log(`Downloading ${total} Mb`);
            });
    });
}
