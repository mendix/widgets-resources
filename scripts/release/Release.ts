// @ts-ignore
import ghRelease from "gh-release";
import ghauth, { AuthOptions, TokenData } from "ghauth";
import { promises as fs, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";
import zipFolder from "zip-folder";

main().catch(handleError);

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const target = args[0];
    const description = args.length > 1 ? args[1] : "No notes";
    const packages = ["packages-common", "packages-native", "packages-web", "packages-hybrid"];
    // eslint-disable-next-line no-console
    console.log("Target", target);

    const projectPackage = await findPackage(packages, target);

    if (projectPackage.path.indexOf("packages-web") !== -1) {
        spawnSync("npm", ["run", "svncheckout"], { cwd: projectPackage.path });
    }
    spawnSync("npm", ["run", "release"], { cwd: projectPackage.path });
    await createChangeLog(description, projectPackage.version, projectPackage.path);

    await zipTestProjects(projectPackage.path);
    const url = await releaseWithAuth(await getAuth(), projectPackage);

    // eslint-disable-next-line no-console
    console.log(`Version ${projectPackage.version} of ${projectPackage.name} successfully published @ ${url}`);
    process.exit(0);
}

async function findPackage(packages: string[], target: string): Promise<any> {
    for (const pack of packages) {
        const folders = await fs.readdir(pack);
        for (const folder of folders) {
            const pathToPackage = join(pack, folder);
            try {
                const stat = await fs.stat(join(pathToPackage, "package.json"));
                if (stat) {
                    const contentBuffer = await fs.readFile(join(pathToPackage, "package.json"));
                    const content = JSON.parse(contentBuffer.toString());
                    if (content.name === target) {
                        return {
                            ...content,
                            path: pathToPackage
                        };
                    }
                }
                // eslint-disable-next-line no-empty
            } catch (e) {}
        }
    }
    throw Error(`Package for ${target} not found`);
}

function getAuth(): Promise<TokenData> {
    return new Promise<TokenData>((resolve, reject) => {
        const options: AuthOptions = {
            configName: "gh-release",
            scopes: ["repo"],
            note: "gh-release",
            userAgent: "gh-release"
        };

        ghauth(options, (error, auth) => (error ? reject(error) : resolve(auth)));
    });
}

async function releaseWithAuth(auth: TokenData, projectPackage: any): Promise<string> {
    const assets = [
        `dist/${projectPackage.version}/${projectPackage.widgetName}.mpk`,
        `dist/${projectPackage.version}/module/${projectPackage.config.moduleName}.mpk`,
        `dist/${projectPackage.version}/${projectPackage.packagePath}.${projectPackage.widgetName}.mpk`,
        "dist/tmp/TestProjects.zip"
    ];
    // eslint-disable-next-line no-console
    console.log(
        "Assets",
        assets.filter(asset => existsSync(projectPackage.path + "/" + asset))
    );

    const tagName = `AppStore release ${projectPackage.name.replace(/^\w/, (c: string) => c.toUpperCase())} v${
        projectPackage.version
    }`;

    const options = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        tag_name: `${projectPackage.name}-v${projectPackage.version}`,
        name: tagName,
        assets: assets.filter(asset => existsSync(projectPackage.path + "/" + asset)),
        auth,
        workpath: projectPackage.path,
        // eslint-disable-next-line @typescript-eslint/camelcase
        target_commitish: "master",
        draft: true
    };

    return new Promise(resolve => {
        ghRelease(options, (error: string, result: { html_url: string }) => {
            if (error) {
                return handleError(error);
            }
            resolve(result.html_url);
        });
    });
}

function handleError(error: any): void {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
}

function createChangeLog(description: string, version: string, path: string): Promise<void> {
    const date = new Date();
    const body = `## [${version}] - ${date.getFullYear()}-${date.getMonth()}-${date.getDay()}
    ${description}
`;
    return fs.appendFile(`${path}/CHANGELOG.md`, body);
}

function zipTestProjects(path: string): Promise<boolean> {
    const source = join(path, "tests", "TestProjects");
    return new Promise(resolve => {
        if (existsSync(source)) {
            const destination = join(path, "dist", "tmp");
            if (!existsSync(destination)) {
                mkdirSync(destination, { recursive: true });
            }
            zipFolder(source, join(destination, "TestProjects.zip"), (error: string) => {
                if (error) {
                    // eslint-disable-next-line no-console
                    console.log("Error trying to zip testProjects", error);
                    return resolve(false);
                }
                // eslint-disable-next-line no-console
                console.log("Successfully zipped the TestProjects");
                resolve(true);
            });
        } else {
            return resolve(false);
        }
    });
}
