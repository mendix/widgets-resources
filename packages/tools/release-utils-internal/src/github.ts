import { execShellCommand } from "./shell";
import { fetch } from "./fetch";

interface GitHubReleaseInfo {
    title: string;
    notes: string;
    tag: string;
    target: string;
    filesToRelease?: string;
    isDraft?: boolean;
    repo?: string;
}

interface GitHubPRInfo {
    title: string;
    body: string;
    head: string;
    base: string;
    repo?: string;
}

export class GitHub {
    authSet = false;

    private async ensureAuth(): Promise<void> {
        if (!this.authSet) {
            await execShellCommand(`echo "${process.env.GH_PAT}" | gh auth login --with-token`);
        }
    }

    async createGithubPRFrom(pr: GitHubPRInfo): Promise<void> {
        await this.ensureAuth();

        const repoArgument = pr.repo ? `-R "${pr.repo}"` : "";

        await execShellCommand(
            `gh pr create --title "${pr.title}" --body "${pr.body}" --base ${pr.base} --head ${pr.head} ${repoArgument}`
        );
    }

    async createGithubReleaseFrom({
        title,
        notes,
        tag,
        filesToRelease = "",
        target,
        isDraft = false,
        repo
    }: GitHubReleaseInfo): Promise<void> {
        await this.ensureAuth();

        const draftArgument = isDraft ? "--draft" : "";
        const repoArgument = repo ? `-R "${repo}"` : "";
        const filesArgument = filesToRelease ? `"${filesToRelease}"` : "";

        const targetHash = (await execShellCommand(`git rev-parse --verify ${target}`)).trim();

        await execShellCommand(
            `gh release create --title "${title}" --notes "${notes}" ${draftArgument} ${repoArgument} "${tag}" --target ${targetHash}  ${filesArgument}`
        );
    }

    async getReleaseIdByReleaseTag(releaseTag: string): Promise<string | undefined> {
        console.log(`Searching for release from Github tag '${releaseTag}'`);
        try {
            const release =
                (await fetch<{ id: string }>(
                    "GET",
                    `https://api.github.com/repos/mendix/widgets-resources/releases/tags/${releaseTag}`
                )) ?? [];

            if (!release) {
                return undefined;
            }

            return release.id;
        } catch (e) {
            if (e instanceof Error && e.message.includes("404")) {
                return undefined;
            }

            throw e;
        }
    }

    async getReleaseArtifacts(releaseTag: string): Promise<Array<{ name: string; browser_download_url: string }>> {
        const releaseId = this.getReleaseIdByReleaseTag(releaseTag);

        if (!releaseId) {
            throw new Error(`Could not find release with tag '${releaseTag}' on GitHub`);
        }

        return fetch<
            Array<{
                name: string;
                browser_download_url: string;
            }>
        >("GET", `https://api.github.com/repos/mendix/widgets-resources/releases/${releaseId}/assets`);
    }

    async getMPKReleaseArtifactUrl(releaseTag: string): Promise<string> {
        const artifacts = await this.getReleaseArtifacts(releaseTag);

        const downloadUrl = artifacts.find(asset => asset.name.endsWith(".mpk"))?.browser_download_url;

        if (!downloadUrl) {
            throw new Error(`Could not retrieve MPK url from GitHub release with tag ${process.env.TAG}`);
        }

        return downloadUrl;
    }
}

export const gh = new GitHub();
