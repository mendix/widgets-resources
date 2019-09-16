import { join } from "path";
import { SvnService } from "./SvnService";
import readline from "readline";
// eslint-disable-next-line no-console
main().catch(console.error);

declare function require(name: string): string;

async function showQuestion(query: string, hidden: boolean): Promise<string> {
    return new Promise<string>(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const stdin = process.openStdin();
        process.stdin.on("data", char => {
            char = char + "";
            switch (char) {
                case "\n":
                case "\r":
                case "\u0004":
                    stdin.pause();
                    break;
                default:
                    if (hidden) {
                        // @ts-ignore
                        process.stdout.clearLine();
                        readline.cursorTo(process.stdout, 0);
                        // @ts-ignore
                        process.stdout.write(query + Array(rl.line.length + 1).join("*"));
                    }
                    break;
            }
        });
        rl.question(query, value => {
            // @ts-ignore
            rl.history = rl.history.slice(1);
            resolve(value);
        });
    });
}

async function main(): Promise<void> {
    const username = await showQuestion("Insert your Sprintr username: ", false);
    const password = await showQuestion("Insert your Sprintr password: ", true);
    // const { SPRINTR_USERNAME, SPRINTR_PASSWORD } = process.env;
    const svnService = new SvnService(username || "", password || "");
    const cwd = process.cwd();

    if (cwd) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const packageContent: any = require(join(cwd, "package.json"));
        const testProjects: any[] = packageContent.config.testProjects;

        if (!testProjects) {
            throw new Error("No TestProjects detected for the widget " + packageContent.widgetName);
        }

        testProjects.forEach(testProject => {
            const testPath = join(cwd, testProject.path);
            // eslint-disable-next-line no-console
            console.log(
                `Checking testProject ${packageContent.config.testProjectId}, branch ${testProject.branch}, revision ${testProject.revision} to ${testPath}`
            );

            svnService.checkOutBranch(
                packageContent.config.testProjectId,
                testProject.branch,
                testPath,
                testProject.revision
            );
        });
    }
}
