import { execSync } from "child_process";
import { mkdir, rm } from "fs/promises";
import { execShellCommand } from "./shell";
import sh from "shelljs";

const commitMessageRegEx = /^"[^"]+"$/i;

function getGHRepoAuthUrl(repoUrl: string): string {
    const url = new URL(repoUrl);
    url.username = process.env.GH_USERNAME!;
    url.password = process.env.GH_PAT!;

    return url.toString();
}

export async function cloneRepo(githubUrl: string, localFolder: string): Promise<void> {
    // clean up local folder
    await rm(localFolder, { recursive: true, force: true });
    await mkdir(localFolder, { recursive: true });

    // clone and set local credentials
    await execSync(`git clone ${getGHRepoAuthUrl(githubUrl)} ${localFolder}`, { stdio: "inherit" });

    // set credentials
    await setLocalGitUserInfo(localFolder);
}

export async function cloneRepoShallow(remoteUrl: string, branch: string, localFolder: string) {
    await execSync(
        `git clone ${getGHRepoAuthUrl(remoteUrl)} --branch=${branch} --depth=1 --single-branch ${localFolder}`,
        { stdio: "inherit" }
    );
}

export async function setLocalGitUserInfo(workingDirectory?: string): Promise<void> {
    await execShellCommand(`git config user.name "${process.env.GH_NAME}"`, workingDirectory);
    await execShellCommand(`git config user.email "${process.env.GH_EMAIL}"`, workingDirectory);
}

export async function addRemoteWithAuthentication(repoUrl: string, remoteName: string) {
    await setLocalGitUserInfo();

    await execShellCommand(`git remote add "${remoteName}" "${getGHRepoAuthUrl(repoUrl)}"`);
}

export function noChanges(): boolean {
    return /nothing to commit/i.test(sh.exec("git commit --dry-run -uno", { silent: true }));
}

export function commit(msg: string): void {
    if (commitMessageRegEx.test(msg)) {
        sh.exec(`git commit -m ${msg}`);
    } else {
        throw new Error("Invalid commit message: Please use quotest for commit message");
    }
}

export function push(remoteName = "origin") {
    sh.exec(`git push ${remoteName}`);
}

export function add(path = ".") {
    sh.exec(`git add ${path}`);
}

export async function updateTestProjectRepo(testProjectDir: string, msg: string): Promise<void> {
    // Change cwd to repo root
    sh.pushd(testProjectDir);
    await setLocalGitUserInfo();
    add();
    if (noChanges()) {
        console.warn("Nothing to commit");
    } else {
        commit(msg);
        push();
    }
    sh.popd();
}
