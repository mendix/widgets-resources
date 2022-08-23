import sh from "./sh";

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

export function setLocalGitUserInfo(workingDirectory?: string): void {
    const hasCWD = !!workingDirectory;
    const { GH_NAME, GH_EMAIL } = process.env;
    if (!GH_NAME || !GH_EMAIL) {
        throw new Error("Required GH_NAME and GH_EMAIL env vars are not set.");
    }
    if (hasCWD) {
        sh.pushd(workingDirectory);
    }
    sh.exec(`git config user.name "${GH_NAME}"`);
    sh.exec(`git config user.email "${GH_EMAIL}"`);
    if (hasCWD) {
        sh.popd();
    }
}

export function cloneRepo(githubUrl: string, localFolder: string): void {
    // clean up local folder
    sh.rm("-rf", localFolder);
    sh.mkdir("-p", localFolder);

    // clone and set local credentials
    sh.exec(`git clone ${getGHRepoAuthUrl(githubUrl)} ${localFolder}`);

    // set credentials
    setLocalGitUserInfo(localFolder);
}

export function cloneRepoShallow(remoteUrl: string, branch: string, localFolder: string): void {
    sh.exec(`git clone ${getGHRepoAuthUrl(remoteUrl)} --branch=${branch} --depth=1 --single-branch ${localFolder}`);
}

export function addRemoteWithAuthentication(repoUrl: string, remoteName: string): void {
    setLocalGitUserInfo();

    sh.exec(`git remote add "${remoteName}" "${getGHRepoAuthUrl(repoUrl)}"`);
}
