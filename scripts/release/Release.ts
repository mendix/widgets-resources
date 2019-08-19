// @ts-ignore
import ghRelease from "gh-release";
import ghauth, { AuthOptions, TokenData } from "ghauth";
import { promises as fs } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

main().catch(handleError);

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const target = args[0];
    const packages = ["packages-common", "packages-native", "packages-web"];
    // await fs.mkdir(testProjectDir, { recursive: true });
    // eslint-disable-next-line no-console
    console.log("Target", target);

    const projectPackage = await findPackage(packages, target);

    spawnSync("lerna", ["version", `--conventional-commits=${projectPackage.name}`]);
    spawnSync("npm", ["run", "release"], { cwd: projectPackage.path });

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
    const tagName = `${projectPackage.name}@${projectPackage.version}`;
    const assets = [`${projectPackage.path}/dist/${projectPackage.version}/${projectPackage.widgetName}.mpk`];

    const options = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        tag_name: `v${projectPackage.version}`,
        name: tagName,
        assets,
        auth,
        workpath: projectPackage.path
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
