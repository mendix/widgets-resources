// @ts-ignore
import ghRelease from "gh-release";
import ghauth, { AuthOptions, TokenData } from "ghauth";
import { promises as fs, existsSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";
import zipFolder from "zip-folder";

main().catch(handleError);

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const target = args[0];
    const description = args.length > 1 ? args[1] : "No notes";
    const packages = ["packages-common", "packages-native", "packages-web"];
    // eslint-disable-next-line no-console
    console.log("Target", target);

    const projectPackage = await findPackage(packages, target);

    spawnSync("npm", ["run", "release"], { cwd: projectPackage.path });
    await createChangeLog(description, projectPackage.version, projectPackage.path);

    zipTestProjects(projectPackage.path);
    releaseWithAuth(await getAuth(), projectPackage);

    // eslint-disable-next-line no-console
    console.log(`Version ${projectPackage.version} of ${projectPackage.name} successfully published`);
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

function getAuth() {
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

function releaseWithAuth(auth: TokenData, projectPackage: any) {
    const tagName = `AppStore release ${projectPackage.name.replace(/^\w/, (c: string) => c.toUpperCase())} v${
        projectPackage.version
    }`;

    const assets = [
        `dist/${projectPackage.version}/${projectPackage.widgetName}.mpk`,
        `dist/${projectPackage.version}/${projectPackage.packagePath}.${projectPackage.widgetName}.mpk`,
        "dist/tmp/TestProjects.zip"
    ];
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

    ghRelease(options, (error: string, result: { html_url: string }) => {
        if (error) {
            return handleError(error);
        }
        // eslint-disable-next-line no-console
        console.log(result.html_url);
        process.exit(0);
    });
}

function handleError(error: any) {
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

function zipTestProjects(path: string): boolean {
    const source = join(path, "tests", "TestProjects");
    const destination = join(path, "dist", "tmp", "TestProjects.zip");
    zipFolder(source, destination, (err: string) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log("Error trying to zip testProjects");
        } else {
            // eslint-disable-next-line no-console
            console.log("Successfully ziped the TestProjects");
            return true;
        }
        return false;
    });
    return false;
}
