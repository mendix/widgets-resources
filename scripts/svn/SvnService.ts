// @ts-ignore
import * as svnUltimate from "node-svn-ultimate";

export class SvnService {
    /**
     * Log the service calls to the console.
     */
    showLog = true;
    private baseUrl = "https://teamserver.sprintr.com";

    constructor(private username: string, private password: string) {}

    checkOutBranch(projectId: string, branch: string, destination: string, revision: number): Promise<void> {
        const branchUrl = this.getBranchUrl(projectId, branch);
        this.log(`Checking out ${branchUrl} to ${destination}`);
        return new Promise<void>(resolve => {
            svnUltimate.commands.checkout(
                branchUrl,
                destination,
                {
                    username: this.username,
                    password: this.password,
                    revision
                },
                (error: any) => {
                    if (!error) {
                        resolve();
                    } else {
                        this.cleanup(destination);
                        throw new Error("failed to checkout" + error);
                    }
                }
            );
        });
    }

    /**
     * Overwrite the default API RUL
     * @param url - The URL to the Mendix API
     */
    setBaseUrl(url: string): void {
        this.baseUrl = url;
    }

    cleanup(destination: string): Promise<void> {
        this.log(`Clean up working copy ${destination}`);
        return new Promise<void>((resolve, reject) => {
            svnUltimate.commands.cleanup(destination, {}, (error: any) => {
                if (!error) {
                    resolve();
                } else {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject("failed to cleanup " + destination + error);
                }
            });
        });
    }

    status(destination: string): Promise<any> {
        this.log(`Get working copy status of ${destination}`);
        return new Promise<any>((resolve, reject) => {
            svnUltimate.commands.status(destination, {}, (error: any, data: any) => {
                this.log("status", data);
                // console.log("status", data.target.entry.$.path, data.target.entry["wc-status"].$.item);
                if (!error) {
                    resolve(data);
                } else {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject("failed to status " + destination + error);
                }
            });
        });
    }

    commit(files: string[], message: string): Promise<void> {
        this.log(`Committing changes ${files} message: ${message}`);
        return new Promise<void>((resolve, reject) => {
            svnUltimate.commands.commit(
                files,
                {
                    username: this.username,
                    password: this.password,
                    params: [`-m "${message}"`]
                },
                (error: any) => {
                    if (!error) {
                        resolve();
                    } else {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject("failed to commit " + files.join(", ") + " " + error);
                    }
                }
            );
        });
    }

    createBranch(projectId: string, sourceBranch: string, targetBranch: string, message: string): Promise<void> {
        const sourceUrl = this.getBranchUrl(projectId, sourceBranch);
        const targetUrl = this.getBranchUrl(projectId, targetBranch);
        this.log(`Create branch copy from ${sourceUrl} to: ${targetUrl}`);
        return new Promise<void>((resolve, reject) => {
            svnUltimate.commands.copy(
                sourceUrl,
                targetUrl,
                {
                    username: this.username,
                    password: this.password,
                    params: [`-m "${message}"`]
                },
                (error: any) => {
                    if (!error) {
                        resolve();
                    } else {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject(`failed to copy ${sourceUrl} to ${targetUrl}: ${error}`);
                    }
                }
            );
        });
    }

    private getBranchUrl(projectId: string, branch: string): string {
        return branch === "trunk"
            ? `${this.baseUrl}/${projectId}/${branch}`
            : `${this.baseUrl}/${projectId}/branches/${branch}`;
    }

    private log(message: string, inline = false): void {
        if (this.showLog) {
            if (inline && process && process.stdout) {
                process.stdout.write(". ");
            } else {
                // eslint-disable-next-line no-console
                console.log(message);
            }
        }
    }
}
