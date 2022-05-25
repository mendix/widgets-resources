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
    await execShellCommand(`git clone ${getGHRepoAuthUrl(githubUrl)} ${localFolder}`);

    // set credentials
    await setLocalGitUserInfo(localFolder);
}

async function setLocalGitUserInfo(workingDirectory?: string): Promise<void> {
    await execShellCommand(`git config user.name "${process.env.GH_NAME}"`, workingDirectory);
    await execShellCommand(`git config user.email "${process.env.GH_EMAIL}"`, workingDirectory);
}

export async function addRemoteWithAuthentication(repoUrl: string, remoteName: string) {
    await setLocalGitUserInfo();

    await execShellCommand(`git remote add "${remoteName}" "${getGHRepoAuthUrl(repoUrl)}"`);
}
