import { execSync } from "child_process";
import { mkdir, rm } from "fs/promises";
import { execShellCommand } from "./shell";

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
