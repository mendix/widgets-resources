import Octokit from "@octokit/rest";
import { promises as fs } from "fs";
import { join } from "path";
const octokit = new Octokit({
    auth: `token ${process.env.GITHUB_TOKEN}`
});

async function readDir(path: string): Promise<string[]> {
    const files = await fs.readdir(path);
    let results: string[] = [];
    for (let file of files) {
        file = path + "/" + file;
        const stat = await fs.stat(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(await readDir(file));
        } else {
            results.push(file);
        }
    }
    return Promise.resolve(results);
}

async function main(): Promise<void> {
    const path = join(process.cwd(), "./artifacts");
    if ((await fs.stat(path)) && process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_COMMIT) {
        const results = await readDir(path);

        const body =
            "This PR failed during Detox tests, To check the failing test recording, please click on the link below: " +
            results.join(",");

        await octokit.pulls.createComment({
            owner: "mendix",
            repo: "widgets-resources",
            // eslint-disable-next-line @typescript-eslint/camelcase
            pull_number: Number(process.env.TRAVIS_PULL_REQUEST),
            body,
            // eslint-disable-next-line @typescript-eslint/camelcase
            commit_id: String(process.env.TRAVIS_COMMIT),
            path: "detox/jest.startup.js"
        });
    } else {
        console.log("None of tests failed");
    }
}

main().catch(reason => {
    // eslint-disable-next-line no-console
    console.error(reason);
    process.exit(-1);
});
