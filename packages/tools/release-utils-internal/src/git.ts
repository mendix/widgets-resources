import { execSync } from "child_process";
import { mkdir, rm } from "fs/promises";
import { execShellCommand } from "./shell";

function getGHRepoAuthUrl(repoUrl: string): string {
    const url = new URL(repoUrl);
    const { GH_USERNAME, GH_PAT } = process.env;
    if (!GH_USERNAME || !GH_PAT) {
        throw new Error("Required GH_USERNAME and GH_PAT env vars are not set.");
    }

    url.username = GH_USERNAME;
    url.password = GH_PAT;

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
    const { GH_NAME, GH_EMAIL } = process.env;
    if (!GH_NAME || !GH_EMAIL) {
        throw new Error("Required GH_NAME and GH_EMAIL env vars are not set.");
    }
    await execShellCommand(`git config user.name "${GH_NAME}"`, workingDirectory);
    await execShellCommand(`git config user.email "${GH_EMAIL}"`, workingDirectory);
}

export async function addRemoteWithAuthentication(repoUrl: string, remoteName: string) {
    await setLocalGitUserInfo();

    await execShellCommand(`git remote add "${remoteName}" "${getGHRepoAuthUrl(repoUrl)}"`);
}
